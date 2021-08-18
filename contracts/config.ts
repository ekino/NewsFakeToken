import dotenv from 'dotenv';
dotenv.config();

type Config = {
    [key: string]: NetworkConfig;
};

type NetworkConfig = {
    node: string;
    accounts: Accounts;
};

type Accounts = {
    [key: string]: Account;
};

type Account = {
    pkh: string;
    sk: string;
    pk: string;
};

const devAccounts = {
    alice: {
        pkh: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
        sk: 'edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq',
        pk: 'edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn',
    },
    bob: {
        pkh: 'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
        sk: 'edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt',
        pk: 'edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4',
    },
};

const config: Config = {
    local: {
        node: 'http://localhost:8732',
        accounts: devAccounts,
    },
    ci: {
        node: 'http://sandbox:20000',
        accounts: devAccounts,
    },
    testnet: {
        node: 'http://52.47.113.94:8732',
        accounts: {
            alice: {
                pkh: 'tz1UxbPFjP22Hmc4tz2cxEXUx3cz17W4L7ow',
                sk: 'edskRgwZgrAsBSN4tN3b6iy6opofPVxsRkn2obRkP156p6bkprxL98hZyxExv6LyBm82BkAYo97uWyZgy96rDjuVM5FehPQMz2',
                pk: 'edpkvYdirUXWtuwdcxPnXkbX4gXeL7LNtji4Qionp71d3Nw6Hmqezz',
            },
            bob: {
                pkh: 'tz1iv68Lbh4v3PWeY7SypNMHgJ78DnS846fB',
                sk: 'edskRwvobw55Fi53ikwAfo3LHwm74Dx4DwhKmM1Bz957TcVgGFhC9Ujnqq6tin4giethoLQCnfULNzGFQWxYqkKaFQbqX7euWu',
                pk: 'edpkv2ttLericWCYLjWsm1uXnWgUBjhTF8MFGLhyMawbjFW7v5Yvc3',
            },
        },
    },
};

export default config[process.env.NETWORK];
