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
    TextInput,
    TouchableHighlight,
    Component,
    ActivityIndicatorIOS
} = React;

 class Login extends Component{
constructor(props){
    super(props);
    this.state = {
        showProgress : false
    }
}

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')} />
                <Text style={styles.heading}>GitHub</Text>
                <TextInput onChangeText = {(text)=>this.setState({username : text})} style={styles.input} placeholder = "Github username" />
                <TextInput onChangeText = {(text)=>this.setState({password : text})} style={styles.input} placeholder = "Github password" secureTextEntry = "true"/>
                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}> 
                    <Text style={styles.buttonText}>Log In</Text>
                 </TouchableHighlight>
                 <ActivityIndicatorIOS
                    animating = {this.state.showProgress} 
                    size = "large" 
                    style = {styles.loader} />
            </View>


        );
    }

    onLoginPressed(){
        console.log(this.state.username + ' ' + this.state.password);
        this.setState({showProgress : true});

        var b = new buffer.Buffer(this.state.username + ':' + this.state.password);
        var encodedAuth = b.toString('base64');
        fetch('https://api.github.com/search/repositories?q=react',{
            headers : {
                'Autorization' : 'Basic' + encodedAuth
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((results)=>{
            console.log(results);
            this.setState({showProgress : false});
        });
    }
}

var styles = React.StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        paddingTop: 40,
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    logo: {
        width: 66,
        height:55
    },
    heading:{
        fontSize:30,
        marginTop:10
    },
    input:{
        height:50,
        marginTop:10,
        padding:4,
        fontSize:18,
        borderWidth:1,
        borderColor:'#48bbec'
    },
    button:{
        marginTop:10,
        backgroundColor:'#48bbec',
        alignSelf:'stretch',
        height:40,
        justifyContent:'center'
    },
    buttonText:{
        fontSize:22,
        color:'#fff',
        alignSelf:'center'
    },
    loader:{
        marginTop: 20
    }
});

module.exports = Login;