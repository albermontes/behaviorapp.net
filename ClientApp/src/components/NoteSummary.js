import React, { Component } from 'react'

export class NoteSummary extends Component {
    
    constructor(props){
        super(props);
        this.state = { location: '', summary: '', loading: true };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.values !== this.props.values) {
            this.setState({ loading: true });
            this.setState(this.props.values);
            this.getSummary(this.props.values);
        }
      }

    render() {
        let contents = this.state.loading
        ? <p></p>
        : <p>{this.state.summary}</p>;

        return (
            <div>
                <h3>Note Summary</h3>
                <span>
                    {contents}
                </span>
            </div>
        )
    }

    async getSummary(values){
        const response = await fetch(
            'notesummary?location=' + values.location +
            '&caregivers=' + values.caregivers);
        const note = await response.json();
        this.setState({
            summary: note.summary, 
            loading: false
        });
    }
}

export default NoteSummary;