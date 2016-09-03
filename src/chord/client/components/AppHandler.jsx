import Code from 'chord/client/components/Code';
import Chords from 'chord/client/components/Chords';
import {Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import {changeSong} from 'chord/client/reducers';
import {connect} from 'react-redux';
import Markdown from 'react-remarkable';

class AppHandler extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {song} = this.props;
        const {chords, lyrics} = song.toObject();
        const metaList = song
            .get('meta', Map())
            .delete('name')
            .map((ii, kk) => `${kk}: ${ii}`)
            .toArray()
            .join(', ')


        return <div className="Wrapper">
            <Code></Code>
            <div className="Wrapper_right">
                <div className="Song">
                    <div className="Grid">
                        <div className="Col-8">
                            <h1>{song.getIn(['meta', 'name'])}</h1>
                            <Chords data={chords} subdivision={song.getIn(['meta', 'subdivision'])}/>
                        </div>
                        <div className="Col-4 Markdown">
                            <div className="Meta">{metaList}</div>
                            <Markdown>{lyrics}</Markdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(({song}) => ({song}), {changeSong})(AppHandler);
