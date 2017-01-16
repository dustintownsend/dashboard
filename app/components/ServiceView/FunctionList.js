import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { shell } from 'electron'
import ServiceValue from '../../containers/ServiceValue'
import Card from '../Card'
import Button from '../Button'
import styles from './FunctionList.css'

const FunctionList = (props) => {
  const service = props.service

  const functionRender = map(service.config.functions, (func, functionName) => {
    if (!func.handler) {
      return (
        <div>Function has no handler. One needs to be added</div>
      )
    }
    const serviceLanguage = getLanguage(service)
    let functionFilePath = func.handler // default of long path name
    if (!func.handler.match(/\//)) {
      functionFilePath = `${service.projectPath}/${func.handler.split('.')[0]}.${serviceLanguage}`
    }
    let functionEvents = (
      <div>No events registered for this function</div>
    )
    if (func.events && func.events.length) {
      functionEvents = func.events.map((event, i) => {
        const eventDisplay = Object.keys(event).map((eventType, j) => {
          // console.log('event', event)
          // console.log('event[eventType]', event[eventType])
          // console.log('typeof event[eventType]', typeof event[eventType])
          let eventValues = event[eventType]
          const fromVar = event[`${eventType}_var`]
          console.log('fromVar', fromVar)
          if (event[eventType] && typeof event[eventType] === 'object') {
            eventValues = Object.keys(event[eventType]).map((property, n) => {
              const value = event[eventType][property]
              // path to value in JSON and AST
              const editPath = `functions.${functionName}.events[${i}].${eventType}.${property}`

              const isFromVariable = event[eventType][`${property}_variable`]
              if (typeof value !== 'object') {
                const displayVal = (typeof value === 'boolean') ? JSON.stringify(value) : value
                let renderValue = (
                  <ServiceValue
                    service={service}
                    valueKey={editPath}
                    value={displayVal}
                  />
                )
                if (isFromVariable) {
                  renderValue = (
                    <span>
                      {isFromVariable}
                    </span>
                  )
                }
                return (
                  <div key={`event-prop-${n}`}>
                    <span className={styles.property}>
                      {`${property}: `}
                    </span>
                    {renderValue}
                  </div>
                )
              }
              return null
            })
          }
          return (
            <div key={`event-value-${j}`} className={styles.event}>
              <div>
                {`event: ${eventType}`}
              </div>
              <div className={styles.properties}>
                {eventValues}
              </div>
            </div>
          )
        })

        return (
          <div key={`event-${i}`} className={styles.events}>
            {eventDisplay}
          </div>
        )
      })
    }
    return (
      <div key={functionName} className={styles.function}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span to={`/service/${service.id}/function/${functionName}`}>
              <ServiceValue
                service={service}
                valueKey={`functions.${functionName}`}
                value={functionName}
              />
            </span>
          </div>

          {functionEvents}
        </div>
        {/*<div className={styles.functionActions}>
          <Button
            type='button'
            onClick={() => { props.runFunctionDeploy(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Deploy Function
          </Button>
          <Button
            type='button'
            onClick={() => { props.showInvokeModal(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Invoke
          </Button>
          <Button
            type='button'
            onClick={() => { props.runLogs(service.id, functionName) }}
            disabled={!service.stage || !service.region}
          >
            Logs
          </Button>
          <Button onClick={() => shell.openItem(functionFilePath)}>
            Open in Editor
          </Button>
        </div>*/}
        <div className={styles.actions}>
          <div className={styles.action} title="Show function's logs" onClick={() => { props.runLogs(service.id, functionName) }}>
            <div className={styles.icon}>
              <svg viewBox="0 0 100 100" style={{ width: '1em', height: '1em' }}>
                <path className={styles.stroke} vectorEffect="non-scaling-stroke" d="M85,32.5H35 M35,50h50 M35,67.5h50 M25,85h60 c5.5,0,10-4.5,10-10V15H25v60c0,5.5-4.5,10-10,10S5,80.5,5,75V35h15" style={{stroke: 'rgb(85, 85, 85)', fill: 'none', strokeWidth: 1.5}} />
              </svg>
            </div>
          </div>
          <div className={styles.action} title="Open with editor" onClick={() => shell.openItem(functionFilePath)}>
            <div className={styles.icon}>
              <svg viewBox="0 0 100 100" style={{ width: '1em', height: '1em' }}>
                <path className={styles.fill} vectorEffect="non-scaling-stroke" d="M41.6,82.8L34.3,80l24.1-62.8l7.4,2.8L41.6,82.8z M74.8,75.2l-5.6-5.6L88.8,50L69.2,30.4l5.6-5.6L100,50 L74.8,75.2z M25.2,75.2L0,50l25.2-25.2l5.6,5.6L11.2,50l19.6,19.6L25.2,75.2z" />
              </svg>
            </div>
          </div>
          <div className={styles.action} title="Invoke function" onClick={() => { props.showInvokeModal(service.id, functionName) }}>
            <div className={styles.icon}>
              <svg viewBox="0 0 100 100" style={{ width: '1em', height: '1em' }}>
                <path className={styles.fill} vectorEffect="non-scaling-stroke" d="M59,50c0,5-4,9-9,9s-9-4-9-9s4-9,9-9S59,45,59,50z M14,41c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S19,41,14,41z M86,41 c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S91,41,86,41z" />
              </svg>
            </div>
          </div>
          <div className={styles.action} title="Deploy function" onClick={() => { props.runFunctionDeploy(service.id, functionName) }}>
            <div className={styles.icon}>
              <svg viewBox="0 0 100 100" style={{ width: '1em', height: '1em' }}>
                <path className={styles.stroke} vectorEffect="non-scaling-stroke" d="M50,5h45c0,0,0,45,0,45 M50,50L95,5 M27.5,5H5v90 c0,0,90,0,90,0V72.5" style={{stroke: 'rgb(85, 85, 85)', fill: 'none', strokeWidth: 1.5}} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className={styles.functionList}>
      {functionRender}
    </div>
  )
}

FunctionList.propTypes = {
  service: PropTypes.object
}

export default FunctionList

const getLanguage = (service) => {
  if (!service.config || !service.config.provider) {
    return 'error'
  }
  const provider = service.config.provider
  if (!provider.runtime) {
    return 'NA'
  }
  if (provider.runtime.match(/node/)) {
    return 'js'
  }
  if (provider.runtime.match(/python/)) {
    return 'py'
  }
  if (provider.runtime.match(/java/)) {
    return 'jar'
  }
  return provider.runtime
}
