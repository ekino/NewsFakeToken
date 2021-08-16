import React, { useEffect, useState } from 'react';

export function PostInfo(
    title: string,
    url: string,
    listNftSources: any,
): React.Dispatch<React.SetStateAction<string | null>> {
    const [res, setRes] = useState<null | string>(null);
    const data = { Title: title.toString(), Url: url.toString(), ListNFTSources: listNftSources };
    useEffect(() => {
        if (res) {
            (async (): Promise<void> => {
                try {
                    let response = await fetch('http://localhost:8080/mint', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(data),
                    });
                    response = await response.json();
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [res]);
    return setRes;
}

export function Upload(): React.Dispatch<React.SetStateAction<string | null>> {
    const [url, setUrl] = useState<null | string>(null);
    useEffect(() => {
        if (url) {
            (async (): Promise<void> => {
                try {
                    let response = await fetch('http://localhost:8080/test');
                    response = await response.json();
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [url]);
    return setUrl;
}

export function RepostInfo(
    title: string,
    url: string,
    oldTokenId: string,
    listNftSources: any,
): React.Dispatch<React.SetStateAction<string | null>> {
    const [res, setRes] = useState<null | string>(null);
    const data = {
        Title: title.toString(),
        Url: url.toString(),
        OldTokenId: oldTokenId.toString(),
        ListNFTSources: listNftSources,
    };
    useEffect(() => {
        if (res) {
            (async (): Promise<void> => {
                try {
                    let response = await fetch('http://localhost:8080/mint', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(data),
                    });
                    response = await response.json();
                    console.log(response);
                } catch (err) {
                    console.log(err);
                }
            })();
        }
    }, [res]);
    return setRes;
}
