'use strict';

var React = require('react-native');
var Text = React.Text;
var View = React.View;
var Image = React.Image;
var buffer = require('buffer');

var {
    Text,
    View,
    Image,
    Component,
    ListView
} = React;

 class Feed extends Component{
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });
        this.state = {
           dataSource : ds.cloneWithRows(['A','B','C'])
        }
    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        var url = 'http://betvision.gr/json';

        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(responseData.node),
                loaded:true
            });
        })
        .done();
    }

    renderRow(rowData){
        return <Text style ={{
            color:'#333'
        }}>
        {rowData.title}
        </Text>
    }

    render(){
        return (
            <View style={styles.container}>
                <ListView 
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow.bind(this)}/>
            </View>
        );
    }

  
}

var styles = React.StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-start'
  }
});

module.exports = Feed;