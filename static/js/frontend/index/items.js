(function () {
    "use strict";

    var Button = ReactBootstrap.Button,
        Panel = ReactBootstrap.Panel,
        Table = ReactBootstrap.Table;

    var Items = React.createClass({
        displayName: "Item List",

        propTypes: {
            source: React.PropTypes.string.isRequired
        },

        getInitialState: function () {
            return {
                itemList: []
            };
        },

        componentDidMount: function () {
            $.get(this.props.source, function (results) {
                if (this.isMounted()) {
                    this.setState({
                        itemList: results
                    });
                }
            }.bind(this));
        },

        render: function () {
            var itemNodes = _.map(this.state.itemList, function (item) {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.quantityInStock}</td>
                        <th><Button bsStyle='primary'>Primary</Button></th>
                    </tr>
                );
            });

            var content = (
                <span>
                    There are no items listed. Would you like to add an item?
                </span>
            );

            if (itemNodes.length) {
                content = (
                    <div id="itemList">
                        <h2>Items</h2>
                        <Table bordered condensed hover striped>
                        <tr>
                            <th>Name</th>
                            <th>Quantity In Stock</th>
                            <th></th>
                        </tr>
                        {itemNodes}
                        </Table>
                    </div>
                );
            }

            return <Panel>{content}</Panel>;
        }
    });

    React.render(
        <Items source="http://localhost:8080/api/items" />,
        document.getElementById("content")
    );
}());
