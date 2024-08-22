import React, { Component } from 'react'

export default class Startwatch extends Component {
    state = {
        hour: 0,
        minute: 0,
        seconds: 0,
        disabled: false,
        interval: "",
        intervals: []
    }

    startFunction = () => {
        let a = setInterval(() => {
            const { hour, minute, seconds } = this.state
            if(seconds === 59){
                if(minute === 59){
                    this.setState({
                        hour: hour + 1,
                        minute: 0,
                        seconds: 0
                    })
                } else {
                    this.setState({
                        minute: minute + 1,
                        seconds: 0
                    })
                } 
            } else{
                this.setState({
                    seconds: seconds + 1
                })
            }            
        }, 100);
        this.setState({
            disabled: true,
            interval: a
        })
    }
    stopFunction = () => {
        const {hour, minute, seconds, interval} = this.state
        clearInterval(interval);
        this.setState({
            disabled:false
        })
    }
    clearFunction = () => {
        const {interval} = this.state
        clearInterval(interval);
        this.setState({
            hour: 0,
            minute: 0,
            seconds: 0,
            disabled: false
        })
    }
    intervalFunction = () => {
        const {hour, minute, seconds, intervals} = this.state
        intervals.push(`${hour}:${minute}:${seconds}`)
        this.setState({
            intervals: intervals
        })
    }
    render() {
        const { hour, minute, seconds, disabled, intervals } = this.state
        return (
            <div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6 offset-3 border d-flex flex-column align-items-center justify-content-center gap-4 p-4">
                            <div className="card-header">
                                <h1>Stop-Watch</h1>
                            </div>
                            <div className="card-body">
                                <h2>{hour} : {minute} : {seconds}</h2>
                            </div>
                            <div className="card-footer d-flex align-items-center justify-content-center gap-3">
                                <button className='btn btn-success' onClick={this.startFunction} disabled={disabled}>Start</button>
                                <button className='btn btn-danger' onClick={this.stopFunction}>Stop</button>
                                <button className='btn btn-info' onClick={this.clearFunction}>Clear</button>
                                <button className='btn btn-primary' onClick={this.intervalFunction}>Interval</button>
                            </div>
                                <h3>Last intervals:</h3>
                                {
                                    intervals.map((item) => {
                                        return <div>
                                            <p>{item}</p><hr />
                                        </div>
                                    })
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
