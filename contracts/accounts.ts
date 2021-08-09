type AccountsConf = {
    [key: string]: Accounts;
};

type Accounts = {
    [key: string]: Account;
};

export type Account = {
    pkh: string;
    sk: string;
    pk: string;
};

const accounts: AccountsConf = {
    testnet: {
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
    dev: {
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
    },
};

export default (network: string): Accounts => accounts[network];
