import logging
from os.path import join, dirname
from unittest import TestCase
from decimal import Decimal
from pytezos.crypto import Key
from pytezos import ContractInterface, MichelsonRuntimeError

for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)

logging.basicConfig(filename='NFTS_contract.log', level=logging.DEBUG)

alice = Key.from_encoded_key(
    "edskS3LMw4BFQjbutGWtLG9MtPhcoSsR6BfkLzrHhf5ZB36TfVqQsDxUXkrLaj6tULpoSnyWDF5HsNZvLJv2wL7W6YAahZPqwa"
)
bob = Key.from_encoded_key(
    "edskRqA1izJkgC8BAzXSnbhtcJdmZqN9YLDHLm7t4SLcVfds4hNGESLK6MH4Fvi8V4sviwMLyDbLRSenQscR4vJUMcoCAT7Pjm"
)

alice_address = alice.public_key_hash()
bob_address = bob.public_key_hash()

class TokenTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.token = ContractInterface.create_from(
            join(dirname(__file__), "./../../build/NFTS_contract.tz"))
        cls.maxDiff = None
