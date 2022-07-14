"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
(function (pchain) {
    'use strict';
    // -------------------------------------------------TYPE CONVERTER-----------------------------------//
    // -------------------------TO BYTES-------------------------------//
    var concatArr = function (arr1, arr2) {
        var temp = new Uint8Array(arr1.length + arr2.length);
        temp.set(new Uint8Array(arr1), 0);
        temp.set(new Uint8Array(arr2), arr1.length);
        return temp;
    };
    pchain.test = function () {
        return 'acb';
    };
    pchain.typeConverter = function () {
        return 'typeConverter';
    };
    pchain.typeConverter.base64ToUint8Array = function (text) {
        return new Uint8Array(Buffer.from(text, 'base64'));
    };
    pchain.typeConverter.hexToUint8Array = function (text) {
        return new Uint8Array(Buffer.from(text, 'hex'));
    };
    pchain.typeConverter.UTF8ToBytes = function (text) {
        return new Uint8Array(Buffer.from(text));
    };
    pchain.typeConverter.U32ToBytes = function (num) {
        var arr = new Uint8Array([
            (num & 0x00000000000000ff),
            (num & 0x000000000000ff00) >> 8,
            (num & 0x0000000000ff0000) >> 16,
            (num & 0x00000000ff000000) >> 24,
        ]);
        return arr;
    };
    pchain.typeConverter.U64ToBytes = function (num) {
        var arr = new Uint8Array([
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
    };
    // -------------------------FROM BYTES-------------------------------//
    pchain.typeConverter.bytesToBase64 = function (U8buffer) {
        return Buffer.from(U8buffer).toString('base64');
    };
    pchain.typeConverter.bytesToBase64URL = function (U8buffer) {
        return pchain.typeConverter.base64Tobase64url(pchain.typeConverter.bytesToBase64(U8buffer));
    };
    pchain.typeConverter.bytesToUTF8 = function (U8buffer) {
        return Buffer.from(U8buffer).toString('utf-8');
    };
    pchain.typeConverter.bytesToHex = function (U8buffer) {
        return Buffer.from(U8buffer).toString('hex');
    };
    pchain.typeConverter.bytesToNumber = function (U8buffer) {
        var buffer = Buffer.from(U8buffer);
        var value = 0;
        for (var i = 0; i < buffer.length; i = i + 1) {
            value += buffer[i] << 8 * ((buffer.length / 2) - i - 1);
        }
        return value;
    };
    pchain.typeConverter.bytesToInt32 = function (buffer) {
        return (buffer[0] << 24) + (buffer[1] << 16) + (buffer[2] << 8) + (buffer[3]);
    };
    pchain.typeConverter.bytesToInt32LE = function (buffer) {
        return pchain.typeConverter.bytesToInt32(pchain.typeConverter.hexToUint8Array(pchain.typeConverter.changeEndianness(pchain.typeConverter.bytesToHex(buffer))));
    };
    pchain.typeConverter.bytesToBigInt = function (U8buffer) {
        var hexLE = '0x' + pchain.typeConverter.changeEndianness(pchain.typeConverter.bytesToHex(U8buffer));
        return BigInt(hexLE);
    };
    pchain.typeConverter.changeEndianness = function (text) {
        var result = [];
        var len = text.length - 2;
        while (len >= 0) {
            result.push(text.substr(len, 2));
            len -= 2;
        }
        return result.join('');
    };
    pchain.typeConverter.base64Tobase64url = function (stringB64) { return stringB64.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, ''); };
    // --------------------------------------------__END TYPECONVERTER__-------------------------------------------------------------------------//
    // --------------------------------------------__START TRANSACTION__-------------------------------------------------------------------------//
    // deserialize from bytes
    pchain.Transaction = function () {
        return [
            { id: 'fa', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'ta', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'v', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'ti', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'gl', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'gp', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'nt', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'h', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'tsig', byteLength: 64, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'tds', byteLength: 4, dependency: 'td', deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); }, serialize: function (x) { return pchain.typeConverter.U32ToBytes(x.length); } },
            { id: 'td', byteLength: 'tds', dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) {
                    // serialize calldata and return result
                    return pchain.serializeCalldata(x);
                } },
        ];
    };
    // --------------------------------------------__END TRANSACTION__-------------------------------------------------------------------------//
    // --------------------------------------------__START BLOCK__-------------------------------------------------------------------------//
    pchain.Block = function () {
        return [
            { id: 'fa', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'ta', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'v', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'ti', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'gl', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'gp', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'nt', byteLength: 8, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return pchain.typeConverter.U64ToBytes(x); } },
            { id: 'h', byteLength: 32, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'tsig', byteLength: 64, dependency: '', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return pchain.typeConverter.base64ToUint8Array(x); } },
            { id: 'tds', byteLength: 4, dependency: 'td', deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); }, serialize: function (x) { return pchain.typeConverter.U32ToBytes(x.length); } },
            { id: 'td', byteLength: 'tds', dependency: '', deserialize: function (buffer) { return buffer; }, serialize: function (x) {
                    // serialize calldata and return result
                    return pchain.serializeCalldata(x);
                } },
        ];
    };
    pchain.BlockHeader = function () {
        return [
            { id: 'bi', byteLength: 8, deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); } },
            { id: 'bv', byteLength: 8, deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); } },
            { id: 't', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
            { id: 'hp', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hi', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hs', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'ht', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hr', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'p', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'sig', byteLength: 64, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } }
        ];
    };
    pchain.BlockData = function () { return ([
        { id: 'tds', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'rds', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'Dt', byteLength: 'tds', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'Dr', byteLength: 'rds', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    // --------------------------------------------__END BLOCK__-------------------------------------------------------------------------//
    pchain.Event = function () { return ([
        { id: 'ts', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'vs', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 't', byteLength: 'ts', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'v', byteLength: 'vs', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    pchain.TransactionReceipt = function () { return ([
        { id: 'sc', byteLength: 1, deserialize: function (buffer) { return buffer[0]; } },
        { id: 'gc', byteLength: 8, deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); } },
        { id: 'rvs', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'es', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'rv', byteLength: 'rvs', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'e', byteLength: 'es', deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    pchain.MerkleProof = function () { return ([
        { id: 'rh', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'tlc', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToBigInt(buffer); } },
        { id: 'lis', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'lhs', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'ps', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'li', byteLength: 'lis', deserialize: function (buffer) { return pchain.deserializeIntoArrayU32(buffer); } },
        { id: 'lh', byteLength: 'lhs', deserialize: function (buffer) { return pchain.byteConcatenate(buffer); } },
        { id: 'prf', byteLength: 'ps', deserialize: function (buffer) { return buffer; } }
    ]); };
    pchain.StateProof = function () { return ([
        { id: 'rh', byteLength: 32, deserialize: function (buffer) { return pchain.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'si', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'sp', byteLength: 4, deserialize: function (buffer) { return pchain.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'pi', byteLength: 'si', deserialize: function (buffer) { return pchain.deserializeItems(buffer); } },
        { id: 'pp', byteLength: 'sp', deserialize: function (buffer) { return pchain.deserializeListofLists(buffer); } }
    ]); };
    pchain.serialize = function (struct, obj) {
        var result = new Uint8Array([]);
        struct.forEach(function (entry) {
            var item = obj[entry.id];
            if (!entry.dependency) {
                var serializedItem = entry.serialize(item);
                result = concatArr(result, serializedItem);
            }
            else {
                var find_in_struct = struct.find(function (structEntry) { return structEntry.id == entry.dependency; });
                if (find_in_struct) {
                    var serializedItem = find_in_struct.serialize(obj[entry.dependency]);
                    var newSerializedItem = entry.serialize(serializedItem);
                    result = concatArr(result, newSerializedItem);
                }
            }
        });
        return result;
    };
    pchain.serializeCalldata = function (calldata) {
        var mn = pchain.typeConverter.UTF8ToBytes(calldata.mn, 0); //mns
        var a = pchain.borshSerialize(calldata.a); //as
        var mns = pchain.typeConverter.U32ToBytes(mn.length, 4); //4
        var as = pchain.typeConverter.U32ToBytes(a.length, 4); //4
        var padding = new Uint8Array([0, 0, 0, 0]);
        var serializedCallData = concatArr(padding, concatArr(mns, concatArr(as, concatArr(mn, a))));
        return serializedCallData;
    };
    pchain.borshSerialize = function (data) {
        var borshSerialization = new Uint8Array([]);
        var arg1 = pchain.typeConverter.U32ToBytes(data.length);
        borshSerialization = concatArr(borshSerialization, arg1);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var arg2 = pchain.typeConverter.U32ToBytes(item.length);
                var arg3 = item;
                borshSerialization = concatArr(borshSerialization, concatArr(arg2, arg3));
            }
        }
        return borshSerialization;
    };
    // --------------------------------------------__END SERIALIZATION__-------------------------------------------------------------------------//
    // --------------------------------------------__START DESERIALIZATION__-------------------------------------------------------------------------//
    pchain.deserialize = function (struct, bytes) {
        var obj = {};
        var offset = 0;
        struct.forEach(function (entry) {
            var _a, _b;
            if (typeof (entry.byteLength) == "number") {
                obj = __assign(__assign({}, obj), (_a = {}, _a[entry.id] = entry.deserialize(bytes.slice(offset, offset + entry.byteLength), entry.byteLength), _a));
                offset += entry.byteLength;
            }
            else {
                var byteLength = obj[entry.byteLength];
                obj = __assign(__assign({}, obj), (_b = {}, _b[entry.id] = entry.deserialize(bytes.slice(offset, offset + byteLength), byteLength), _b));
                offset += byteLength;
            }
        });
        return obj;
    };
    pchain.byteConcatenate = function (bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 32) {
            var data = (bytes.slice(i, i + 32));
            result.push(data);
        }
        return result;
    };
    pchain.deserializeIntoArrayU32 = function (bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            var data = pchain.typeConverter.bytesToInt32LE(bytes.slice(i, i + 4));
            result.push(data);
        }
        return result;
    };
    pchain.deserializeOptions = function (bytes) {
        return bytes.slice(1);
    };
    pchain.deserializeListofLists = function (bytes) {
        var n = pchain.typeConverter.bytesToInt32LE(bytes.slice(0, 4));
        var size = [];
        var sizeCount = 0;
        var j = 0;
        var result = [];
        for (var i = 1; i < n + 1; i++) {
            size.push(pchain.typeConverter.bytesToInt32LE(bytes.slice(i * 4, (i + 1) * 4)));
            j = (i + 1) * 4;
        }
        while (j < bytes.length) {
            var item = bytes.slice(j, j + size[sizeCount]);
            result.push(item);
            j = j + size[sizeCount];
            sizeCount++;
        }
        return result;
    };
    pchain.deserializeItems = function (bytes) {
        var cursor = 0;
        var itemsSize = pchain.typeConverter.bytesToInt32LE(bytes.slice(0, 4));
        cursor += 4;
        var size = [];
        var sizeCount = 0;
        var result = [];
        for (var i = 0; i < itemsSize; i++) {
            size.push(pchain.typeConverter.bytesToInt32LE(bytes.slice(cursor, cursor + 4)));
            cursor += 4;
        }
        while (cursor < bytes.length) {
            var itemSize = size[sizeCount];
            var item = bytes.slice(cursor, cursor + itemSize);
            var size1 = pchain.typeConverter.bytesToInt32LE(item.slice(0, 4));
            var size2 = pchain.typeConverter.bytesToInt32LE(item.slice(4, 8));
            var entry1 = item.slice(8, 8 + size1);
            var entry2 = item.slice(8 + size1, 8 + size1 + size2);
            entry2 = pchain.deserializeOptions(entry2);
            result.push([entry1, entry2]);
            cursor += itemSize;
            sizeCount++;
        }
        return result;
    };
    // --------------------------------------------__END DESERIALIZATION__-------------------------------------------------------------------------//
})(typeof module !== "undefined" && module.exports ? module.exports : (self.pchain = self.pchain || {}));
