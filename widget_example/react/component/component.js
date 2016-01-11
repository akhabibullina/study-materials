/**
 * Created by annakh on 1/10/16.
 */
var Widget = React.createClass({
    getInitialState: function () {
        return {uistate: 'default'};
    },
    toggle: function () {
        this.setState({uistate: this.state.uistate === 'default' ? 'full' : 'default'});
    },
    render: function () {
        var stateClass = "box " + this.state.uistate;
        return <section className="container">
            <div id="box1" onClick={this.toggle} className={stateClass}> Box</div>
        </section>;
    }
});

ReactDOM.render(
    <Widget name="World"/>,
    document.getElementById('container')
);