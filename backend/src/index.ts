import express from "express";
import pinataSDK from "@pinata/sdk";
import fs from 'fs';

const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8080; 
let pinata: any;

const corsOptions = {
    origin: ["http://localhost:3000", "https://NewsFakeToken.com"],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
);

app.get("/test", async (req, res) => {
    const PinataKeys = require("./PinataKeys");
    pinata = pinataSDK('ea1522e3c24fd69b67c7', 'b0b203264f0bb66c5cc0bac22c6348085dc93774f835ad6931204cec607849ae');
    await pinata.testAuthentication().then((result: any) => {
        console.log(result);
    }).catch((err: any) => {
        console.log(err);
    });
    res.json({'data':'You are connected to the Api'});
});

app.post("/mint", async (req, res) => {
    pinata = pinataSDK('ea1522e3c24fd69b67c7', 'b0b203264f0bb66c5cc0bac22c6348085dc93774f835ad6931204cec607849ae');
    console.dir(req);
    const formData = req.body;
    if (!formData) {
        res.status(500).json({ status: false, msg: 'no file provided' });
    } else {
        const fileName = formData.Title;
        await pinata
            .testAuthentication()
            .catch((err: any) => res.status(500).json(JSON.stringify(err)));
        const options: any = {
            pinataMetadata: {
                name: req.body.Title,
                keyvalues: {
                    description: req.body.Url
                }
            }
        };
        const metadata = {
            name: req.body.Title,
            url: req.body.Url,
            listeOfSources: req.body.ListNFTSources,
            symbol: "TUT",
            is_transferable: true,
            shouldPreferSymbol: false
        };

        const pinnedMetadata = await pinata.pinJSONToIPFS(metadata, {
            pinataMetadata: {
                name: "TUT-metadata"
            }
        });

        if (pinnedMetadata.IpfsHash && pinnedMetadata.PinSize > 0) {
            res.status(200).json({
                status: true,
            msg: {
                metadataHash: pinnedMetadata.IpfsHash
                }
            });
        } else {
            res
            .status(500)
            .json({ status: false, msg: "metadata were not pinned" });
            }
      
        }
    });

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});