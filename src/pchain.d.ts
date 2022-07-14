// Type definition for pchain.js

export as namespace pchain;

declare var pchain:pchain;
export = pchain;

declare namespace pchain{

    export interface DataType{
        id:string;
        byteLength: number;
        dependency: string;
        serialize:(item: any) => Uint8Array;
        deserialize:(buffer: Uint8Array, byteLength:number) => any;
    }

    export interface BlockHeader{
        (): DataType[];
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

    export interface BlockData{
        (): DataType[];
        transaction_block_data_size: number;
        receipt_block_data_size: number;
        transaction_data: Uint8Array;
        receipt_data: Uint8Array;
    }

    export interface Block{
        block_header: BlockHeader;
        block_data: BlockData
    }

    export interface Transaction{
        (): DataType[];
        data_type: any;
        from_address: string;
        to_address: string;
        value: BigInt;
        tip: BigInt;
        gas_limit: BigInt;
        gas_price: BigInt;
        nonce: BigInt;
        hash: string;
        signature: string;
        data_size?: number;
        data:  Uint8Array;
    }

    export interface TranscationReceipt{
        (): DataType[];
        gas_consumed: BigInt;
        state_code: number;
        return_value_size: number;
        events_size: number;
        return_value: Uint8Array;
        events: Uint8Array;
    }

    export interface Event{
        (): DataType[];
        topic_size: number;
        value_size: number;
        topic: Uint8Array;
        value: Uint8Array;
    }

    export interface CallData{
        method_name: string;
        arguments: Uint8Array;
    }

    export interface MerkleProof{
        root_hash: string;
        total_leaves_count: number;
        leaf_indices_size: number;
        leaf_hashes_size: number;
        proof_size: number;
        leaf_indices: Uint8Array;
        leaf_hashes: Uint8Array;
        proof: Uint8Array;
    }

    export interface StateProof{
        root_hash: string;
        size_items: number;
        size_proof: number;
        items: Uint8Array;
        proof: Uint8Array;
    }

    export interface typeConverter {
        (): string;
        base64ToUint8Array(text:string): Uint8Array;
        hexToUint8Array(text:string): Uint8Array;
        UTF8ToBytes(text:string): Uint8Array;
        U32ToBytes(number:number): Uint8Array;
        U64ToBytes(number:number): Uint8Array;
        bytesToBase64(U8buffer:Uint8Array): string;
        bytesToBase64URL(U8buffer:Uint8Array): string;
        bytesToUTF8(U8buffer:Uint8Array): string;
        bytesToHex(U8buffer:Uint8Array): string;
        bytesToNumber(U8buffer:Uint8Array): string;
        bytesToBigInt(U8buffer:Uint8Array): string;
        changeEndianness(string:Uint8Array): string;
        base64Tobase64url(text:string): string;
    }

}

declare interface pchain{
    test(): string;
    typeConverter: pchain.typeConverter;
    deserialize(data_type: pchain.DataType[], bytes: Uint8Array): any;
    serialize(data_type: pchain.DataType[], obj: any): Uint8Array;
    serializeCalldata(data:any): Uint8Array;
    borshSerialize(data:any): Uint8Array;
}