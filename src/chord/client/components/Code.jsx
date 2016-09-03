import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState} from 'draft-js';
import {changeSong} from 'chord/client/reducers';
import {connect} from 'react-redux';


var song = `name: Come Hear The Angels Sing
beatsPerBar: 4
key: Dm
---
<intro>DmC,F-,DC,F-
<verse>DmC,F-,B♭,C(x2)
Dm,C,F,B♭,FBb,CDm,B♭C:,F
<chorus>FB♭,C,B♭C,F,FB♭,C,G,G,B♭,B♭
---
Come hear the angels sing; Worthy is the Lamb that was slain
Gathering round the throne; Hail the Son of Man; Hail the Son of Man
Not for their sin He died; It was no angel crucified
And yet they hold Him in their sight; And live to praise their Lord

Come hear the elders sing; As they fall in praise to the Lamb
Bowing before the throne; Laying down their crowns; Laying down their crowns
They praise Him for His blood; With which He purchased men for God
They praise the Saviour of the world; The Lamb He is their Lord

_Hear the heavens shout; Worthy is the Lamb
All creation bows; Giving glory to the Lamb
Worthy is the Lamb_

What is the song we'll sing; As we join in heaven with our God
A people from every land; Crowding round the Lamb; Crowding round the Lamb
We'll sing salvation's song; How many million voices strong
We'll sing the glory of our King; Of Jesus Christ our Lord`

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(song))
        };
        this.onChange = this.onChange.bind(this);
        this.props.changeSong(this.state.editorState);
    }
    onChange(editorState) {
        this.props.changeSong(editorState);
        this.setState({
            editorState
        });
    }
    render() {
        const {editorState} = this.state;
        return <Editor editorState={editorState} onChange={this.onChange} />;
    }
}

export default connect(({song}) => ({song}), {changeSong})(Code);
