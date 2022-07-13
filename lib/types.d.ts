declare var xpll: xpll;
declare namespace xpll {
    interface Serialize {
        source: Object;
    }
    interface BlockHeader {
        blockchain_id: number;
        block_version_number: number;
        timestamp: number;
        previous_block_hash: string;
        this_block_hash: string;
        state_hash: string;
        transaction_trie_root_hash: string;
        receipt_trie_root_hash: string;
        proposer_public_key: string;
        signature: string;
    }
    interface BlockData {
        transaction_block_data_size: number;
        receipt_block_data_size: number;
        transaction_data: Uint8Array;
        receipt_data: Uint8Array;
    }
    interface Block {
        block_header: BlockHeader;
        block_data: BlockData;
    }
    interface Transaction {
        from_address: string;
        to_address: string;
        value: BigInt;
        tip: BigInt;
        gas_limit: BigInt;
        gas_price: BigInt;
        nonce: BigInt;
        hash: string;
        signature: string;
        data_size: number;
        data: Uint8Array;
    }
    interface TranscationReceipt {
        gas_consumed: BigInt;
        state_code: number;
        return_value_size: number;
        events_size: number;
        return_value: Uint8Array;
        events: Uint8Array;
    }
    interface Event {
        topic_size: number;
        value_size: number;
        topic: Uint8Array;
        value: Uint8Array;
    }
    interface CallData {
        method_name: string;
        arguments: Uint8Array;
    }
    interface MerkleProof {
        root_hash: string;
        total_leaves_count: number;
        leaf_indices_size: number;
        leaf_hashes_size: number;
        proof_size: number;
        leaf_indices: Uint8Array;
        leaf_hashes: Uint8Array;
        proof: Uint8Array;
    }
    interface StateProof {
        root_hash: string;
        size_items: number;
        size_proof: number;
        items: Uint8Array;
        proof: Uint8Array;
    }
}
declare interface xpll {
    test(): void;
}
