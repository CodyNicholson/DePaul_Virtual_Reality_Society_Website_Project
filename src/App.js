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
                    <img className="entryImg" alt="Example" src={ this.props.children.split(';')[3] } />
                    <div className="textContent">
                        <h2 className="title">{ this.props.children.split(';')[0] }</h2>
                        <div className="date">{ this.props.children.split(';')[1] }</div>
                        <div className="description">{ this.props.children.split(';')[2] }</div>
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
                    <img className="entryImg" alt="Example" src={ this.props.children.split(';')[3] } />
                    <div className="textContent">
                        <h2 className="title">{ this.props.children.split(';')[0] }</h2>
                        <div className="description">{ this.props.children.split(';')[1] }</div>
                        <div className="collaborators">{ "Collaborators:" + this.props.children.split(';')[2] }</div>
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

class UpdateBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.addUpdate = this.addUpdate.bind(this);
    }
    addUpdate(text) {
        fire.database().ref('updates').push( text );
    }
    render() {
        return (
            <div>
                <div className="board">
                    {this.props.updatesList.map(update =>
                        <UpdateComponent key={update.id} updateId={update.id}>
                            {update.text}
                        </UpdateComponent>
                    )}
                    <button onClick={this.addUpdate.bind(null, "Default Update Title;\nDefault Update Description;\nDefault Date;")} className="button-create2">Add New Update</button>
                </div>
            </div>
        );
    }
}

class UpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.editUpdate = this.editUpdate.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);
        this.removeUpdate = this.removeUpdate.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {editing: false};
    }
    editUpdate() {
        this.setState({editing: true});
    }
    saveUpdate() {
        fire.database().ref('updates/'+this.props.updateId).set(this.refs.newText.value)
            .then(() => console.log("Save Successful"))
            .catch((error) => console.log("Save failed: " + error.message));
        window.location.reload();
    }
    removeUpdate() {
        fire.database().ref('updates/'+this.props.updateId).remove()
            .then(() => console.log("Remove Successful"))
            .catch((error) => console.log("Remove failed: " + error.message));
        window.location.reload();
    }
    renderNormal() {
        return (
            <div className='commentContainer'>
                <div className="projFlexList">
                    <div className="textContent">
                        <h2 className="title">{ this.props.children.split(';')[0] }</h2>
                        <div className="date">{ this.props.children.split(';')[2] }</div>
                        <div className="description">{ this.props.children.split(';')[1] }</div>
                        <button onClick={this.editUpdate} className="button-primary">Edit</button>
                        <button onClick={this.removeUpdate} className="button-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
    renderForm() {
        return (
            <div className="editCommentContainer">
                <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                <button onClick={this.saveUpdate} className="button-success">Save</button>
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

class SponsorBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.addSponsor = this.addSponsor.bind(this);
    }
    addSponsor(text) {
        fire.database().ref('sponsors').push( text );
    }
    render() {
        return (
            <div>
                <div className="board">
                    {this.props.sponsorsList.map(sponsor =>
                        <SponsorComponent key={sponsor.id} sponsorId={sponsor.id}>
                            {sponsor.text}
                        </SponsorComponent>
                    )}
                    <button onClick={this.addSponsor.bind(null, "Default Sponsor Name;\nDefault Sponsor Description;\nhttps://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png;")} className="button-create2">Add New Sponsor</button>
                </div>
            </div>
        );
    }
}

class SponsorComponent extends Component {
    constructor(props) {
        super(props);
        this.editSponsor = this.editSponsor.bind(this);
        this.saveSponsor = this.saveSponsor.bind(this);
        this.removeSponsor = this.removeSponsor.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.state = {editing: false};
    }
    editSponsor() {
        this.setState({editing: true});
    }
    saveSponsor() {
        fire.database().ref('sponsors/'+this.props.sponsorId).set(this.refs.newText.value)
            .then(() => console.log("Save Successful"))
            .catch((error) => console.log("Save failed: " + error.message));
        window.location.reload();
    }
    removeSponsor() {
        fire.database().ref('sponsors/'+this.props.sponsorId).remove()
            .then(() => console.log("Remove Successful"))
            .catch((error) => console.log("Remove failed: " + error.message));
        window.location.reload();
    }
    renderNormal() {
        return (
            <div className='commentContainer'>
                <div className="projFlexList">
                    <img className="entryImg" alt="Example" src={ this.props.children.split(';')[2] } />
                    <div className="textContent">
                        <h2 className="title">{ this.props.children.split(';')[0] }</h2>
                        <div className="description">{ this.props.children.split(';')[1] }</div>
                        <button onClick={this.editSponsor} className="button-primary">Edit</button>
                        <button onClick={this.removeSponsor} className="button-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
    renderForm() {
        return (
            <div className="editCommentContainer">
                <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                <button onClick={this.saveSponsor} className="button-success">Save</button>
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
        this.clickUpdates = this.clickUpdates.bind(this);
        this.clickSponsors = this.clickSponsors.bind(this);
        this.clickContact = this.clickContact.bind(this);
        this.state = { page: "Home", projects: [], events: [], updates: [], sponsors: [] };
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
        let updatesRef = fire.database().ref('/updates').orderByKey().limitToLast(100);
        updatesRef.on('child_added', node => {
            let update = { text: node.val(), id: node.key };
            this.setState({ updates: [update].concat(this.state.updates) });
        });
        let sponsorsRef = fire.database().ref('/sponsors').orderByKey().limitToLast(100);
        sponsorsRef.on('child_added', node => {
            let sponsor = { text: node.val(), id: node.key };
            this.setState({ sponsors: [sponsor].concat(this.state.sponsors) });
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
    clickUpdates() {
        this.setState({page: "Updates"});
    }
    clickSponsors() {
        this.setState({page: "Sponsors"});
    }
    clickContact() {
        this.setState({page: "Contact"});
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
        if (this.state.page === "Updates")
        {
            return this.renderUpdates();
        }
        else if (this.state.page === "Sponsors")
        {
            return this.renderSponsors();
        }
        else if (this.state.page === "Contact")
        {
            return this.renderContact();
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
                <iframe title="VR Gallery" src="https://codynicholson.github.io/Virtual_Reality_Image_Component_Project/"></iframe>
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
    renderUpdates()
    {
        return (
            <div className="pageBodyContainer">
                <div className="scrollDiv">
                    <UpdateBoardComponent updatesList={this.state.updates} />
                </div>
            </div>
        );
    }
    renderSponsors()
    {
        return (
            <div className="pageBodyContainer">
                <div className="scrollDiv">
                    <SponsorBoardComponent sponsorsList={this.state.sponsors} />
                </div>
            </div>
        );
    }
    renderContact()
    {
        return (
            <div className="pageBodyContainer">
                <div className="scrollDiv">
                    <div className="contact">
                        <h2>President: <em>Joseph Walker</em> - call or text at 443-248-4492</h2>
                        <h3>Communications Director: <em>Sarah Herchenbach</em></h3>
                        <h4>Lead Developer: <em>Alec Scott</em></h4>
                        <h4>Vice President: <em>Victor Shollenberger</em></h4>
                        <h4>Treasurer: <em>Kevin Sobolewski</em></h4>
                        <hr></hr>
                        <p>Meetings are on Tuesday's from 6-8 in CDM 634 (subject to change)</p>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                <div id="navBar">
                    <img alt="DePaul VR" src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14572368_1541399855886376_5791530445074361234_n.jpg?oh=d5089ac690a9415c4dd6497bfd9a57d9&oe=5AB84A57"  className="logo"></img>
                    <nav id="topNav">
                        <div onClick={this.clickHome} className="navItem">Home</div>
                        <div onClick={this.clickProjects} className="navItem">Projects</div>
                        <div onClick={this.clickEvents} className="navItem">Events</div>
                    </nav>
                </div>
                {this.renderBody()}
                <div className="footer">
                    <nav id="bottomNav">
                        <div onClick={this.clickUpdates} className="navItem">Updates</div>
                        <div onClick={this.clickSponsors} className="navItem3">Sponsors</div>
                        <div onClick={this.clickContact} className="navItem">Contact</div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default App;
