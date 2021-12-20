import React, { useState } from 'react';

import fetch from './libs/fetch';
import Config from './ApiUri';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';


import ButtonGroup from '@mui/material/ButtonGroup';

function prettyJson(obj: unknown) {
    return JSON.stringify(obj, null, 2)
}


async function fetchShards(policy: string) {
    let parsedPolicy = {}
    try {
        parsedPolicy = JSON.parse(policy)
    } catch (ex) {
        return new Promise<string>(resolve => resolve("Invalid JSON: " + ex))
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPolicy)
    };
    return fetch(Config.ApiUri, requestOptions).then(response => response)
}

function Shatter(input: string, setShardOutput: React.Dispatch<React.SetStateAction<string>>, setExplanationOutput: React.Dispatch<React.SetStateAction<string[]>>) {
    return fetchShards(input)
        .then(response => {
            setShardOutput(prettyJson(response.shards))
            setExplanationOutput(response.explain)
        })
        .catch(err => { setShardOutput(err); setExplanationOutput([err]) })

}

function Sandbox() {
    const [input, setInput] = useState("");
    const [outputShards, setShardOutput] = useState("");
    const [outputExplanation, setExplanationOutput] = useState<string[]>(["Explanation appears here."]);
    const [showJson, toggleShowJson] = useState(false);
    return (<Box className="Sandbox-box">
        <h1>PolicyGlass Playground</h1>
        <p>Use the playground below to try out different AWS policies to see how they are turned into Policy Shards.</p>
        <Box sx={{ width: 1 }}>
            <Box className="policy" display="grid" gap={2}>

                <Box gridColumn="span 5" className="Input-shards">
                    <h2>Input Policy</h2>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button onClick={() => setInput('')}>Reset</Button>
                            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*"], "Resource": "*" }] }))}>Allow</Button>
                            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*"], "Resource": "*" }, { "Effect": "Deny", "Action": ["s3:*"], "Resource": "arn:aws:s3:::examplebucket/*" }] }))}>Allow and Deny</Button>
                            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*", "s3:GetObject"], "Resource": "*" }, { "Effect": "Deny", "Action": ["s3:PutObject"], "NotResource": "arn:aws:s3:::examplebucket/*", "Condition": { "StringNotEquals": { "s3:x-amz-server-side-encryption": "AES256" } } }] }))}>Condition</Button>
                        </ButtonGroup>
                        <TextareaAutosize onChange={(event) => setInput(event.target.value)} placeholder="Enter an AWS Policy here." value={input}></TextareaAutosize>
                    </Box>
                </Box>
                <Box gridColumn="span 1" className="Shatter-box">
                    <Button variant="contained" onClick={() => Shatter(input, setShardOutput, setExplanationOutput)} >Shatter</Button>
                </Box>
                <Box gridColumn="span 5" className="Output-shards">
                    <h2>Output Shards</h2>
                    <ButtonGroup variant="outlined" aria-label="outlined secondary button group">
                        <Button onClick={() => toggleShowJson(false)} disabled={!showJson}>Simple Explanation</Button>
                        <Button onClick={() => toggleShowJson(true)} disabled={showJson}>JSON</Button>
                    </ButtonGroup>
                    <Box sx={{ display: showJson ? 'none' : 'block' }} >
                        <ul>
                            {outputExplanation.map((value, index) => <li key={index}>{value}</li>)}
                        </ul>
                    </Box>
                    <Box sx={{ display: showJson ? 'block' : 'none' }} >
                        <TextareaAutosize placeholder="Shards appear here." disabled={true} value={outputShards}></TextareaAutosize>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box >)
}

export default Sandbox;
