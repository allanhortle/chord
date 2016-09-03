import {combineReducers} from 'redux';
import {createAction} from 'redux-actions';
import {Map, fromJS} from 'immutable';
import yamlparser from 'yamlparser';

export const changeSong = createAction('CHANGE_SONG');



export default combineReducers({
    song: (state = Map(), {type, payload}) => {
        switch (type) {
            case 'CHANGE_SONG':
                var [meta, chords, lyrics] = payload
                    .getCurrentContent()
                    .getPlainText()
                    .split('---');

                var newChords = chords
                    .split('\n')
                    .filter(ii => ii.length)
                    .map(section => {
                        const [match, title, chords, endOfLine] = section.match(/^(?:<(.*)>)?(.*?)(?:\((.*)\))?$/i);
                        return {
                            title,
                            chords: chords
                                .split(',')
                                .map(bar => bar.split(/(?=[ABCDEFG\-])/).filter(n => n !== ' ')),
                            endOfLine
                        };
                    });


                return state
                    .set('meta', fromJS(yamlparser.eval(meta)))
                    .set('chords', fromJS(newChords))
                    .set('lyrics', lyrics)


            default:
                return state;
        }
    }
});



