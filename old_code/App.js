import React, { Component } from 'react';
import fire from './fire';

        var ProjectComponent = React.createClass({
            getInitialState: function () {
                return {editing: false}
            },
            edit: function () {
                this.setState({editing: true});
            },
            save: function () {
                this.props.updateCommentText(this.refs.newText.value, this.props.index);
                this.setState({editing: false});
            },
            remove: function () {
                console.log('Removing comment');
                this.props.deleteFromBoard(this.props.index);
            },
            renderNormal: function () {
                return (
                    <div className='commentContainer'>
                        <div className="projFlexList">
                            <img className="projImg" src={ this.props.children.split(';')[3] } />
                            <div>
                                <h2 className="projectTitle">{ this.props.children.split(';')[0] }</h2>
                                <div className="projectDescription">{ this.props.children.split(';')[1] }</div>
                                <div className="projectCollaborators">{ "Collaborators:" + this.props.children.split(';')[2] }</div>
                                <button onClick={this.edit} className="button-primary">Edit</button>
                                <button onClick={this.remove} className="button-danger">Remove</button>
                            </div>
                        </div>
                    </div>
                );
            },
            renderForm: function () {
                return (
                    <div className="editCommentContainer">
                        <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                        <button onClick={this.save} className="button-success">Save</button>
                    </div>
                );
            },
            render: function () {
                if(!this.state.editing)
                {
                    return this.renderNormal();
                }
                else
                {
                    return this.renderForm();
                }
            }
        });
        var ProjectBoardComponent = React.createClass({
            getInitialState: function () {
                return {
                    comments: []
                }
            },
            add: function (text) {
                var arr = this.state.comments;
                arr.push(text);
                this.setState({comments: arr});
            },
            removeComment: function (i) {
                console.log('Removing comment: ' + i);
                var arr = this.state.comments;
                arr.splice(i, 1);
                this.setState({comments: arr});
            },
            updateComment: function (newText, i) {
                console.log('Updating comment ' + i);
                var arr = this.state.comments;
                arr[i] = newText;
                this.setState({comments: arr});
            },
            eachComment: function (text, i) {
                return (
                    <ProjectComponent key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
                        {text}
                    </ProjectComponent>
                );
            },
            render: function () {
                return (
                    <div>
                        <button onClick={this.add.bind(null, "Default Project Title;\nDefault Project Description;\nDefault Collaborators;\nhttps://www.technodoze.com/wp-content/uploads/2016/03/default-placeholder.png;")} className="button-create">Add New Project</button>
                        <div className="board">
                            {this.state.comments.map(this.eachComment)}
                        </div>
                    </div>
                );
            }
        });

        var CalendarComponent = React.createClass({
            getInitialState: function () {
                return {editing: false}
            },
            edit: function () {
                this.setState({editing: true});
            },
            save: function () {
                this.props.updateCommentText(this.refs.newText.value, this.props.index);
                this.setState({editing: false});
            },
            remove: function () {
                console.log('Removing comment');
                this.props.deleteFromBoard(this.props.index);
            },
            renderNormal: function () {
                return (
                    <div className='commentContainer'>
                        <h2 className="eventTitle">{ this.props.children.split(';')[0] }</h2>
                        <div className="eventData">{ this.props.children.split(';')[1] }</div>
                        <div className="eventDescription">{ this.props.children.split(';')[2] }</div>
                        <button onClick={this.edit} className="button-primary">Edit</button>
                        <button onClick={this.remove} className="button-danger">Remove</button>
                    </div>
                );
            },
            renderForm: function () {
                return (
                    <div className="editCommentContainer">
                        <textarea ref="newText" className="editProject" defaultValue={this.props.children}></textarea>
                        <button onClick={this.save} className="button-success">Save</button>
                    </div>
                );
            },
            render: function () {
                if(!this.state.editing)
                {
                    return this.renderNormal();
                }
                else
                {
                    return this.renderForm();
                }
            }
        });
        var CalendarBoardComponent = React.createClass({
            getInitialState: function () {
                return {
                    comments: []
                }
            },
            add: function (text) {
                var arr = this.state.comments;
                arr.push(text);
                this.setState({comments: arr});
            },
            removeComment: function (i) {
                console.log('Removing comment: ' + i);
                var arr = this.state.comments;
                arr.splice(i, 1);
                this.setState({comments: arr});
            },
            updateComment: function (newText, i) {
                console.log('Updating comment ' + i);
                var arr = this.state.comments;
                arr[i] = newText;
                this.setState({comments: arr});
            },
            eachComment: function (text, i) {
                return (
                    <CalendarComponent key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
                        {text}
                    </CalendarComponent>
                );
            },
            render: function () {
                return (
                    <div>
                        <button onClick={this.add.bind(null, "Default Event Title;\nDefault Date;\nDefault Event Description;")} className="button-create">Add New Event</button>
                        <div className="board">
                            {this.state.comments.map(this.eachComment)}
                        </div>
                    </div>
                );
            }
        });

        var FooterComponent = React.createClass({
            render: function () {
                return (
                    <div className="footer">
                        Joseph Walker (President) - call or text at 443-248-4492<br/>Victor Shollenberger (Vice President)<br/>Kevin Sobolewski (Treasurer)<br/>Sarah Herchenbach (Communications Director)<br/><br/>Meetings are on Tuesday's from 6-8 in CDM 634 (subject to change)
                    </div>
                );
            }
        });

        var App = React.createClass({
            getInitialState: function ()
            {
                return { bodyState: "Home" }
            },
            clickHome: function () {
                this.setState({bodyState: "Home"});
            },
            clickProjects: function () {
                this.setState({bodyState: "Projects"});
            },
            clickCalendar: function () {
                this.setState({bodyState: "Calendar"});
            },
            renderHome: function () {
                return (
                    <div id='insideParentDiv'>
                        <div id="navBar">
                            <img src="imgs/logo.jpg"  className="logo"></img>
                            <nav>
                                <div onClick={this.clickHome} className="navItem">Home</div>
                                <div onClick={this.clickProjects} className="navItem">Projects</div>
                                <div onClick={this.clickCalendar} className="navItem">Calendar</div>
                            </nav>
                        </div>
                        <div className="pageBodyContainer">
                            <iframe src="https://codynicholson.github.io/Virtual_Reality_Image_Component_Project/" width="99.5%" height="495px"></iframe>
                        </div>
                        <FooterComponent />
                    </div>
                );
            },
            renderProjects: function () {
                return (
                    <div id='insideParentDiv'>
                        <div id="navBar">
                            <img src="imgs/logo.jpg"  className="logo"></img>
                            <nav>
                                <div onClick={this.clickHome} className="navItem">Home</div>
                                <div onClick={this.clickProjects} className="navItem">Projects</div>
                                <div onClick={this.clickCalendar} className="navItem">Calendar</div>
                            </nav>
                        </div>
                        <div className="pageBodyContainer">
                            <div className="scrollDiv">
                                <ProjectBoardComponent />
                            </div>
                        </div>
                        <FooterComponent />
                    </div>
                );
            },
            renderCalendar: function () {
                return (
                    <div id='insideParentDiv'>
                        <div id="navBar">
                            <img src="imgs/logo.jpg"  className="logo"></img>
                            <nav>
                                <div onClick={this.clickHome} className="navItem">Home</div>
                                <div onClick={this.clickProjects} className="navItem">Projects</div>
                                <div onClick={this.clickCalendar} className="navItem">Calendar</div>
                            </nav>
                        </div>
                        <div className="pageBodyContainer">
                            <div className="scrollDiv">
                                <CalendarBoardComponent />
                            </div>
                        </div>
                        <FooterComponent />
                    </div>
                );
            },
            render: function () {
                if (this.state.bodyState === "Home")
                {
                    return this.renderHome();
                }
                else if (this.state.bodyState === "Projects")
                {
                    return this.renderProjects();
                }
                else if (this.state.bodyState === "Calendar")
                {
                    return this.renderCalendar();
                }
                else
                {
                    return (
                        <div id='insideParentDiv'>
                            <div id="navBar">
                                <img src="imgs/logo.jpg"  className="logo"></img>
                                <nav>
                                    <div onClick={this.clickHome} className="navItem">Home</div>
                                    <div onClick={this.clickProjects} className="navItem">Projects</div>
                                    <div onClick={this.clickCalendar} className="navItem">Calendar</div>
                                </nav>
                            </div>
                            <div className="pageBodyContainer">
                                Congratulations. You have found a non-existing state.
                            </div>
                            <FooterComponent />
                        </div>
                    );
                }
            }
        });

export default App;
