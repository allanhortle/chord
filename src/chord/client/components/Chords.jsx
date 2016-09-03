import React from 'react';
import {Maybe} from 'monet'


export default function Chord({data, subdivision = 4}) {

    function renderLine(line, key) {
        const {title, endOfLine, chords} = line.toObject();
        return <li className="Chord_line" key={key}>
            {title && <div className="Chord_title">{title}</div>}
            <div className="Chord_endOfLine">{endOfLine}</div>
            <ul>{chords.map(renderBar)}</ul>
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
