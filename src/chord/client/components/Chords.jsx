import React from 'react';
import {Maybe} from 'monet'


export default function Chord({data, subdivision = 4}) {

    function renderLine(line, key) {
        return <li className="Chord_line" key={key}>
            <div className="Chord_title">{line.get('title')}</div>
            <div className="Chord_endOfLine">{line.get('endOfLine')}</div>
            <ul>{line.get('chords').map(renderBar)}</ul>
        </li>
    }

    function renderBar(bar, key) {
        return <div
            className="Chord_bar"
            key={key}
            style={{width: `${100 / subdivision}%`}}>
            {bar.map((chord, kk) => <div className="Chord_chord" style={{width: `${100 / bar.size}%`}}>{chord}</div>)}
        </div>
    }


    return Maybe
        .fromNull(data)
        .map(data => <ul className="Chord">{data.map(renderLine)}</ul>)
        .orSome(null)
}
