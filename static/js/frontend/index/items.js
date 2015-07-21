(function () {
    "use strict";

    var React = require("react");

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
                        <table>
                        <tr>
                            <th>Name</th>
                            <th>Quantity In Stock</th>
                        </tr>
                        {itemNodes}
                        </table>
                    </div>
                );
            }

            return content;
        }
    });

    React.render(
        <Items source="http://localhost:8080/api/items" />,
        document.getElementById("content")
    );
}());
