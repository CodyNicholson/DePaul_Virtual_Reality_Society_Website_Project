import React, { Component } from 'react';
import fire from './fire';

class CalendarBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.addEvent = this.addEvent.bind(this);
    }
    addEvent(text) {
        fire.database().ref('events').push( text );
    }
    render() {
        return (
            <div>
                <div className="board">
                    <button onClick={this.addEvent.bind(null, "Default Event Title;\nDefault Date;\nDefault Event Description;\nhttps://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png;")} className="button-create">Add New Event</button>
                    {this.props.eventsList.map(event =>
                        <CalendarComponent key={event.id} eventId={event.id} >
                            {event.text}
                        </CalendarComponent>
                    )}
                </div>
            </div>
        );
    }
}

class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.editEvent = this.editEvent.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.renderEvent = this.renderEvent.bind(this);
        this.renderEditEvent = this.renderEditEvent.bind(this);
        this.state = {editing: false};
    }
    editEvent() {
        this.setState({editing: true});
    }
    saveEvent() {
        fire.database().ref('events/'+this.props.eventId).set(this.refs.newText.value)
            .then(() => console.log("Save Successful"))
            .catch((error) => console.log("Save failed: " + error.message));
        window.location.reload();
    }
    removeEvent() {
        fire.database().ref('events/'+this.props.eventId).remove()
            .then(() => console.log("Remove Successful"))
            .catch((error) => console.log("Remove failed: " + error.message));
        window.location.reload();
    }
    renderEvent() {
        return (
            <div className='commentContainer'>
                <div className="projFlexList">
                    <img className="projImg" alt="Example" src={ this.props.children.split(';')[3] } />
                    <div className="textContent">
                        <h2 className="eventTitle">{ this.props.children.split(';')[0] }</h2>
                        <div className="eventData">{ this.props.children.split(';')[1] }</div>
                        <div className="eventDescription">{ this.props.children.split(';')[2] }</div>
                        <button onClick={this.editEvent} className="button-primary">Edit</button>
                        <button onClick={this.removeEvent} className="button-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
    renderEditEvent() {
        return (
            <div className="editCommentContainer">
                <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                <button onClick={this.saveEvent} className="button-success">Save</button>
            </div>
        );
    }
    render() {
        if(!this.state.editing)
        {
            return this.renderEvent();
        }
        else
        {
            return this.renderEditEvent();
        }
    }
}

class ProjectBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.addProject = this.addProject.bind(this);
    }
    addProject(text) {
        fire.database().ref('projects').push( text );
    }
    render() {
        return (
            <div>
                <div className="board">
                    <button onClick={this.addProject.bind(null, "Default Project Title;\nDefault Project Description;\nDefault Collaborators;\nhttps://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png;")} className="button-create">Add New Project</button>
                    {this.props.projectsList.map(project =>
                        <ProjectComponent key={project.id} projectId={project.id}>
                            {project.text}
                        </ProjectComponent>
                    )}
                </div>
            </div>
        );
    }
}

class ProjectComponent extends Component {
    constructor(props) {
        super(props);
        this.editProject = this.editProject.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.removeProject = this.removeProject.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {editing: false};
    }
    editProject() {
        this.setState({editing: true});
    }
    saveProject() {
        fire.database().ref('projects/'+this.props.projectId).set(this.refs.newText.value)
            .then(() => console.log("Save Successful"))
            .catch((error) => console.log("Save failed: " + error.message));
        window.location.reload();
    }
    removeProject() {
        fire.database().ref('projects/'+this.props.projectId).remove()
            .then(() => console.log("Remove Successful"))
            .catch((error) => console.log("Remove failed: " + error.message));
        window.location.reload();
    }
    renderNormal() {
        return (
            <div className='commentContainer'>
                <div className="projFlexList">
                    <img className="projImg" alt="Example" src={ this.props.children.split(';')[3] } />
                    <div className="textContent">
                        <h2 className="projectTitle">{ this.props.children.split(';')[0] }</h2>
                        <div className="projectDescription">{ this.props.children.split(';')[1] }</div>
                        <div className="projectCollaborators">{ "Collaborators:" + this.props.children.split(';')[2] }</div>
                        <button onClick={this.editProject} className="button-primary">Edit</button>
                        <button onClick={this.removeProject} className="button-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
    renderForm() {
        return (
            <div className="editCommentContainer">
                <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                <button onClick={this.saveProject} className="button-success">Save</button>
            </div>
        );
    }
    render() {
        if(!this.state.editing)
        {
            return this.renderNormal();
        }
        else
        {
            return this.renderForm();
        }
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.clickHome = this.clickHome.bind(this);
        this.clickProjects = this.clickProjects.bind(this);
        this.clickEvents = this.clickEvents.bind(this);
        this.state = { page: "Home", projects: [], events: [] };
    }
    componentWillMount() {
        let eventsRef = fire.database().ref('/events').orderByKey().limitToLast(100);
        eventsRef.on('child_added', node => {
            let event = { text: node.val(), id: node.key };
            this.setState({ events: [event].concat(this.state.events) });
        });
        let projectsRef = fire.database().ref('/projects').orderByKey().limitToLast(100);
        projectsRef.on('child_added', node => {
            let project = { text: node.val(), id: node.key };
            this.setState({ projects: [project].concat(this.state.projects) });
        });
    }
    clickHome() {
        this.setState({page: "Home"});
    }
    clickProjects() {
        this.setState({page: "Projects"});
    }
    clickEvents() {
        this.setState({page: "Events"});
    }
    renderBody() {
        if (this.state.page === "Home")
        {
            return this.renderHome();
        }
        else if (this.state.page === "Projects")
        {
            return this.renderProjects();
        }
        else if (this.state.page === "Events")
        {
            return this.renderEvents();
        }
        else
        {
            return (<div>Congratulations. You have found a non-existing state</div>)
        }
    }
    renderHome()
    {
        return (
            <div className="pageBodyContainer">
                <iframe title="VR Gallery" src="https://codynicholson.github.io/Virtual_Reality_Image_Component_Project/" width="99.5%" height="495px"></iframe>
            </div>
        );
    }
    renderProjects() {
        return (
            <div className="pageBodyContainer">
                <div className="scrollDiv">
                    <ProjectBoardComponent projectsList={this.state.projects} />
                </div>
            </div>
        );
    }
    renderEvents()
    {
        return (
            <div className="pageBodyContainer">
                <div className="scrollDiv">
                    <CalendarBoardComponent eventsList={this.state.events} />
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <div id="navBar">
                    <img alt="DePaul VR" src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14572368_1541399855886376_5791530445074361234_n.jpg?oh=d5089ac690a9415c4dd6497bfd9a57d9&oe=5AB84A57"  className="logo"></img>
                    <nav>
                        <div onClick={this.clickHome} className="navItem">Home</div>
                        <div onClick={this.clickProjects} className="navItem">Projects</div>
                        <div onClick={this.clickEvents} className="navItem">Events</div>
                    </nav>
                </div>
                {this.renderBody()}
                <div className="footer">
                    Joseph Walker (President) - call or text at 443-248-4492<br/>Victor Shollenberger (Vice President)<br/>Kevin Sobolewski (Treasurer)<br/>Sarah Herchenbach (Communications Director)<br/><br/>Meetings are on Tuesday's from 6-8 in CDM 634 (subject to change)
                </div>
            </div>
        );
    }
}

export default App;
