import { DataType } from "./pchain";
import pchain = require("./pchain");

(function(pchain) {
    'use strict';
    
    // -------------------------------------------------TYPE CONVERTER-----------------------------------//
    // -------------------------TO BYTES-------------------------------//

    var concatArr = (arr1: Uint8Array, arr2: Uint8Array) => {
        var temp = new Uint8Array(arr1.length + arr2.length);
        temp.set(new Uint8Array(arr1), 0);
        temp.set(new Uint8Array(arr2), arr1.length);
        return temp;
    }

    pchain.test = () => {
        return 'acb'
    }

    pchain.typeConverter = () => {
        return 'typeConverter'
    }
    
    pchain.typeConverter.base64ToUint8Array = (text: string) => {
        return new Uint8Array(Buffer.from(text, 'base64'))
    }
    
    pchain.typeConverter.hexToUint8Array = (text: string) => {
        return new Uint8Array(Buffer.from(text, 'hex'));
    }
    
    pchain.typeConverter.UTF8ToBytes = (text:string) => {
        return new Uint8Array(Buffer.from(text))
    }

    pchain.typeConverter.U32ToBytes = (num: number) => {
        let arr = new Uint8Array([
            (num & 0x00000000000000ff),
            (num & 0x000000000000ff00) >> 8,
            (num & 0x0000000000ff0000) >> 16,
            (num & 0x00000000ff000000) >> 24,
        ]);
        return arr;
    }

    pchain.typeConverter.U64ToBytes = (num: number) => {
        let arr = new Uint8Array([
            (num & 0x00000000000000ff),
            (num & 0x000000000000ff00) >> 8,
            (num & 0x0000000000ff0000) >> 16,
            (num & 0x00000000ff000000) >> 24,
            (num & 0x000000ff00000000) >> 32,
            (num & 0x0000ff0000000000) >> 40,
            (num & 0x00ff000000000000) >> 48,
            (num & 0xff00000000000000) >> 56,
       ]);
        return arr;
    }
    
    // -------------------------FROM BYTES-------------------------------//
    
    pchain.typeConverter.bytesToBase64 = (U8buffer: Uint8Array) => {
        return Buffer.from(U8buffer).toString('base64');
    }
    
    pchain.typeConverter.bytesToBase64URL = (U8buffer: Uint8Array) => {
        return pchain.typeConverter.base64Tobase64url(pchain.typeConverter.bytesToBase64(U8buffer));
    }
    
    pchain.typeConverter.bytesToUTF8 = (U8buffer: Uint8Array) => {
        return Buffer.from(U8buffer).toString('utf-8');
    }
    
    pchain.typeConverter.bytesToHex = (U8buffer: Uint8Array) => {
        return Buffer.from(U8buffer).toString('hex');
    }
    
    pchain.typeConverter.bytesToNumber = (U8buffer: Uint8Array) => {
        let buffer = Buffer.from(U8buffer);
        let value = 0;
        for(let i=0;i<buffer.length;i=i+1){
            value += buffer[i] << 8*((buffer.length/2) - i -1)
        }
        return value
    }

    pchain.typeConverter.bytesToInt32 = (buffer:Uint8Array) => {
        return (buffer[0] << 24) + (buffer[1] << 16) + (buffer[2] << 8) + (buffer[3]) ;
      }

    pchain.typeConverter.bytesToInt32LE = (buffer:Uint8Array) => {
        return pchain.typeConverter.bytesToInt32(pchain.typeConverter.hexToUint8Array(pchain.typeConverter.changeEndianness(pchain.typeConverter.bytesToHex(buffer))))
    }
    
    pchain.typeConverter.bytesToBigInt = (U8buffer: Uint8Array) => {
        const hexLE = '0x' + pchain.typeConverter.changeEndianness(pchain.typeConverter.bytesToHex(U8buffer))
        return BigInt(hexLE);
    }
    
    pchain.typeConverter.changeEndianness = (text: string) => {
        const result = [];
        let len = text.length - 2;
        while(len >= 0){
            result.push(text.substr(len,2))
            len -= 2;
        }
        return result.join('');
    }
    
    pchain.typeConverter.base64Tobase64url = (stringB64: string) => stringB64.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
    
    // --------------------------------------------__END TYPECONVERTER__-------------------------------------------------------------------------//

    // --------------------------------------------__START TRANSACTION__-------------------------------------------------------------------------//

    // deserialize from bytes
    pchain.Transaction = () => {
        return [
            {id:'fa', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'ta', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'v', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'ti', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'gl', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'gp', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'nt', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'h', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'tsig', byteLength:64, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'tds', byteLength:4, dependency:'td', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)}, serialize:(x: any)=>{return pchain.typeConverter.U32ToBytes(x.length)}},
            {id:'td', byteLength:'tds', dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: any)=>{
                // serialize calldata and return result
                return pchain.serializeCalldata(x)
            }},
        ]
    }

    // --------------------------------------------__END TRANSACTION__-------------------------------------------------------------------------//

    // --------------------------------------------__START BLOCK__-------------------------------------------------------------------------//

    pchain.Block = () => {
        return [
            {id:'fa', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'ta', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'v', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'ti', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'gl', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'gp', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'nt', byteLength:8, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}, serialize:(x: BigInt)=>{return pchain.typeConverter.U64ToBytes(x)}},
            {id:'h', byteLength:32, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'tsig', byteLength:64, dependency:'', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}, serialize:(x: string)=>{return pchain.typeConverter.base64ToUint8Array(x)}},
            {id:'tds', byteLength:4, dependency:'td', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)}, serialize:(x: any)=>{return pchain.typeConverter.U32ToBytes(x.length)}},
            {id:'td', byteLength:'tds', dependency:'', deserialize:(buffer: Uint8Array)=>{return buffer}, serialize:(x: any)=>{
                // serialize calldata and return result
                return pchain.serializeCalldata(x)
            }},
        ]
    }

    pchain.BlockHeader = () => {
        return [
            {id:'bi', byteLength:8, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}},
            {id:'bv', byteLength:8, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}},
            {id:'t', byteLength:4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)}}, 
            {id:'hp', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'hi', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'hs', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'ht', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'hr', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'p', byteLength:32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
            {id:'sig', byteLength:64, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}}
        ]
    }

    pchain.BlockData = () => ([
        { id:'tds', byteLength:4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'rds', byteLength:4 , deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)}},
        { id:'Dt', byteLength:'tds', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'Dr', byteLength:'rds', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} }
    ])

    // --------------------------------------------__END BLOCK__-------------------------------------------------------------------------//

    
    pchain.Event = () => ([
        { id:'ts', byteLength:4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'vs', byteLength:4 , deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)}},
        { id:'t', byteLength:'ts', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'v', byteLength:'vs', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} }
    ])

    pchain.TransactionReceipt = () => ([
        { id:'sc', byteLength: 1, deserialize:(buffer: Uint8Array)=>{return buffer[0]} },
        { id:'gc', byteLength: 8 , deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}},
        { id:'rvs', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'es', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'rv', byteLength:'rvs', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'e', byteLength:'es', deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} }
    ])

    pchain.MerkleProof = () => ([
        { id:'rh', byteLength: 32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'tlc', byteLength: 4 , deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBigInt(buffer)}},
        { id:'lis', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'lhs', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'ps', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'li', byteLength:'lis', deserialize:(buffer: Uint8Array)=>{return pchain.deserializeIntoArrayU32(buffer)} },
        { id:'lh', byteLength:'lhs', deserialize:(buffer: Uint8Array)=>{return pchain.byteConcatenate(buffer)} },
        { id:'prf', byteLength:'ps', deserialize:(buffer: Uint8Array)=>{return buffer} }
    ])

    pchain.StateProof = () => ([
        { id:'rh', byteLength: 32, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToBase64URL(buffer)} },
        { id:'si', byteLength: 4 , deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)}},
        { id:'sp', byteLength: 4, deserialize:(buffer: Uint8Array)=>{return pchain.typeConverter.bytesToInt32LE(buffer)} },
        { id:'pi', byteLength: 'si', deserialize:(buffer: Uint8Array)=>{return pchain.deserializeItems(buffer)} },
        { id:'pp', byteLength:'sp', deserialize:(buffer: Uint8Array)=>{return pchain.deserializeListofLists(buffer)} }
    ])
    
    
    
    pchain.serialize = (struct: pchain.DataType[], obj:any) => {
        
        let result = new Uint8Array([]);
       
        struct.forEach((entry: pchain.DataType)=>{
            let item = obj[entry.id]
            if(!entry.dependency){
                const serializedItem = entry.serialize(item);
                result = concatArr(result, serializedItem)
            }else{
                const find_in_struct = struct.find((structEntry)=>structEntry.id == entry.dependency)
                if(find_in_struct){
                    const serializedItem = find_in_struct.serialize(obj[entry.dependency])
                    const newSerializedItem = entry.serialize(serializedItem)
                    result = concatArr(result, newSerializedItem)
                }
            }
        })

        return result;
    }

    pchain.serializeCalldata = (calldata:any) => {
    
        const mn = pchain.typeConverter.UTF8ToBytes(calldata.mn, 0)       //mns
        const a = pchain.borshSerialize(calldata.a)                       //as
        const mns = pchain.typeConverter.U32ToBytes(mn.length, 4)         //4
        const as = pchain.typeConverter.U32ToBytes(a.length,4)            //4
    
        const padding = new Uint8Array([0,0,0,0]);
        const serializedCallData = concatArr(padding, concatArr(mns, concatArr(as, concatArr(mn, a))));
    
        return serializedCallData;
    } 
    
    pchain.borshSerialize = (data:any) => {
        let borshSerialization:Uint8Array = new Uint8Array([]);
        let arg1 = pchain.typeConverter.U32ToBytes(data.length);
        borshSerialization = concatArr(borshSerialization, arg1);
        if(data.length > 0){
            for (let i = 0; i < data.length; i++){
                const item = data[i];
                let arg2 = pchain.typeConverter.U32ToBytes(item.length);
                let arg3 = item;
                borshSerialization = concatArr(borshSerialization, concatArr(arg2, arg3));
            }
        }

        return borshSerialization
    }

    // --------------------------------------------__END SERIALIZATION__-------------------------------------------------------------------------//

    // --------------------------------------------__START DESERIALIZATION__-------------------------------------------------------------------------//

    
    pchain.deserialize = (struct: pchain.DataType[], bytes: Uint8Array) => { 

        let obj = {};
        let offset = 0;
        struct.forEach((entry: pchain.DataType) => {
            if(typeof(entry.byteLength) == "number"){
                obj = {...obj, [entry.id]:entry.deserialize(bytes.slice(offset, offset + entry.byteLength), entry.byteLength)}
                offset += entry.byteLength
            }
            else{
                const byteLength = obj[entry.byteLength]
                obj = {...obj, [entry.id]: entry.deserialize(bytes.slice(offset, offset + byteLength), byteLength)}
                offset += byteLength;
            }
        })
        return obj;
    }

    pchain.byteConcatenate = (bytes: Uint8Array) => {
        let result = [];
        for(let i=0;i<bytes.length;i+=32){
            const data = (bytes.slice(i, i+32));
            result.push(data)
        }
        return result;
    }

    pchain.deserializeIntoArrayU32 = (bytes: Uint8Array) => { 
        let result = [];
        for(let i=0;i<bytes.length;i+=4){
            const data = pchain.typeConverter.bytesToInt32LE(bytes.slice(i, i+4));
            result.push(data)
        }
        return result;
    }

    pchain.deserializeOptions = (bytes: Uint8Array) => { 
        return bytes.slice(1)
    }

    pchain.deserializeListofLists = (bytes: Uint8Array) => { 
        const n = pchain.typeConverter.bytesToInt32LE(bytes.slice(0, 4))
        let size = [];
        let sizeCount = 0;
        let j = 0;
        let result = [];
        for(let i=1;i<n+1;i++){
            size.push(pchain.typeConverter.bytesToInt32LE(bytes.slice(i*4,(i+1)*4)))
            j = (i+1)*4
        }
        while(j<bytes.length){   
            const item = bytes.slice(j, j + size[sizeCount])
            result.push(item);
            j = j + size[sizeCount]
            sizeCount++;
        }
        return result;
    }

    pchain.deserializeItems = (bytes: Uint8Array) => {
        let cursor = 0;
        const itemsSize = pchain.typeConverter.bytesToInt32LE(bytes.slice(0, 4));
        cursor += 4;
        let size=[];
        let sizeCount = 0;
        let result = []

        for(let i=0; i<itemsSize;i++){
            size.push(pchain.typeConverter.bytesToInt32LE(bytes.slice(cursor, cursor + 4)))
            cursor += 4
        }

        while(cursor < bytes.length){
            const itemSize = size[sizeCount];
            const item = bytes.slice(cursor, cursor+itemSize);
            let size1 = pchain.typeConverter.bytesToInt32LE(item.slice(0,4));
            let size2 = pchain.typeConverter.bytesToInt32LE(item.slice(4,8));
            let entry1 = item.slice(8, 8 + size1);
            let entry2 = item.slice(8 + size1, 8 + size1 + size2)
            entry2 = pchain.deserializeOptions(entry2)
        
            result.push([entry1, entry2])
            cursor += itemSize
            sizeCount++
        }
        return result

    }

    // --------------------------------------------__END DESERIALIZATION__-------------------------------------------------------------------------//

})(typeof module !== "undefined" && module.exports ? module.exports : (self.pchain = self.pchain || {}));