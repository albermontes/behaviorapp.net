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
        : <pre>
            {this.state.summary}
        </pre>;

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

        this.setState({
            summary: JSON.stringify(values, null, 2),
            loading: false
        });

        /*const response = await fetch(
            'notesummary?location=' + values.location +
            '&caregivers=' + values.caregivers +
            '&activities=' + values.activities + 
            '&positiveResponse=' + values.positiveResponse +
            '&reinforcementsBefore=' + values.reinforcementsBefore +
            '&reinforcementsAfter=' + values.reinforcementsAfter +
            '&replacements=' + values.replacements +
            '&behaviors=' + values.behaviors +
            '&interventions=' + values.interventions);

        const note = await response.json();
        this.setState({
            summary: note.summary, 
            loading: false
        });
        */
    }
}

export default NoteSummary;