import React from 'react';
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
    try {
        JSON.parse(policy)
    } catch {
        return new Promise<string>(resolve => resolve("Invalid JSON"))
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(policy)
    };
    return fetch(Config.ApiUri, requestOptions).then(response => prettyJson(response))
}

function Shatter(input: string, setOutput: React.Dispatch<React.SetStateAction<string>>) {
    return fetchShards(input)
        .then(response => setOutput(response))
        .catch(err => setOutput(err))

}

function Sandbox(input: string, setInput: React.Dispatch<React.SetStateAction<string>>, output: string, setOutput: React.Dispatch<React.SetStateAction<string>>) {
    return (<Box className="Sandbox-box">
        <h1>PolicyGlass Playground</h1>
        <p>Use the playground below to try out different AWS policies to see how they are turned into Policy Shards.</p>
        <ButtonGroup className="examples" variant="outlined" aria-label="outlined primary button group">
            <Button onClick={() => setInput('')}>Reset</Button>
            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*"], "Resource": "*" }] }))}>S3 Allow</Button>
            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*"], "Resource": "*" }, { "Effect": "Deny", "Action": ["s3:*"], "Resource": "arn:aws:s3:::examplebucket/*" }] }))}>Allow and Deny</Button>
            <Button onClick={() => setInput(prettyJson({ "Version": "2012-10-17", "Statement": [{ "Effect": "Allow", "Action": ["s3:*", "s3:GetObject"], "Resource": "*" }, { "Effect": "Deny", "Action": ["s3:PutObject"], "NotResource": "arn:aws:s3:::examplebucket/*", "Condition": { "StringNotEquals": { "s3:x-amz-server-side-encryption": "AES256" } } }] }))}>Complex Allow/Deny Combination</Button>
        </ButtonGroup>
        <Box sx={{ width: 1 }}>
            <Box className="policy" display="grid" gap={2}>

                <Box gridColumn="span 5" className="Input-shards">
                    <h2>Input Policy</h2>
                    <TextareaAutosize onChange={(event) => setInput(event.target.value)} placeholder="Enter an AWS Policy here." value={input}></TextareaAutosize>
                </Box>
                <Box gridColumn="span 1" className="Shatter-box">
                    <Button variant="contained" onClick={() => Shatter(input, setOutput)} >Shatter</Button>
                </Box>
                <Box gridColumn="span 5" className="Output-shards">
                    <h2>Output Shards</h2>
                    <TextareaAutosize placeholder="Shards appear here." disabled={true} value={output}></TextareaAutosize>
                </Box>
            </Box>
        </Box>
    </Box >)
}

export default Sandbox;
