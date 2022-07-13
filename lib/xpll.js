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
(function (xpll) {
    'use strict';
    // -------------------------------------------------TYPE CONVERTER-----------------------------------//
    // -------------------------TO BYTES-------------------------------//
    var concatArr = function (arr1, arr2) {
        var temp = new Uint8Array(arr1.length + arr2.length);
        temp.set(new Uint8Array(arr1), 0);
        temp.set(new Uint8Array(arr2), arr1.length);
        return temp;
    };
    xpll.test = function () {
        return 'acb';
    };
    xpll.typeConverter = function () {
        return 'typeConverter';
    };
    xpll.typeConverter.base64ToUint8Array = function (text) {
        return new Uint8Array(Buffer.from(text, 'base64'));
    };
    xpll.typeConverter.hexToUint8Array = function (text) {
        return new Uint8Array(Buffer.from(text, 'hex'));
    };
    xpll.typeConverter.UTF8ToBytes = function (text) {
        return new Uint8Array(Buffer.from(text));
    };
    xpll.typeConverter.U32ToBytes = function (num) {
        var arr = new Uint8Array([
            (num & 0x00000000000000ff),
            (num & 0x000000000000ff00) >> 8,
            (num & 0x0000000000ff0000) >> 16,
            (num & 0x00000000ff000000) >> 24,
        ]);
        return arr;
    };
    xpll.typeConverter.U64ToBytes = function (num) {
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
    xpll.typeConverter.bytesToBase64 = function (U8buffer) {
        return Buffer.from(U8buffer).toString('base64');
    };
    xpll.typeConverter.bytesToBase64URL = function (U8buffer) {
        return xpll.typeConverter.base64Tobase64url(xpll.typeConverter.bytesToBase64(U8buffer));
    };
    xpll.typeConverter.bytesToUTF8 = function (U8buffer) {
        return Buffer.from(U8buffer).toString('utf-8');
    };
    xpll.typeConverter.bytesToHex = function (U8buffer) {
        return Buffer.from(U8buffer).toString('hex');
    };
    xpll.typeConverter.bytesToNumber = function (U8buffer) {
        var buffer = Buffer.from(U8buffer);
        var value = 0;
        for (var i = 0; i < buffer.length; i = i + 1) {
            value += buffer[i] << 8 * ((buffer.length / 2) - i - 1);
        }
        return value;
    };
    xpll.typeConverter.bytesToInt32 = function (buffer) {
        return (buffer[0] << 24) + (buffer[1] << 16) + (buffer[2] << 8) + (buffer[3]);
    };
    xpll.typeConverter.bytesToInt32LE = function (buffer) {
        return xpll.typeConverter.bytesToInt32(xpll.typeConverter.hexToUint8Array(xpll.typeConverter.changeEndianness(xpll.typeConverter.bytesToHex(buffer))));
    };
    xpll.typeConverter.bytesToBigInt = function (U8buffer) {
        var hexLE = '0x' + xpll.typeConverter.changeEndianness(xpll.typeConverter.bytesToHex(U8buffer));
        return BigInt(hexLE);
    };
    xpll.typeConverter.changeEndianness = function (text) {
        var result = [];
        var len = text.length - 2;
        while (len >= 0) {
            result.push(text.substr(len, 2));
            len -= 2;
        }
        return result.join('');
    };
    xpll.typeConverter.base64Tobase64url = function (stringB64) { return stringB64.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, ''); };
    // --------------------------------------------__END TYPECONVERTER__-------------------------------------------------------------------------//
    // --------------------------------------------__START TRANSACTION__-------------------------------------------------------------------------//
    // deserialize from bytes
    xpll.Transaction = function () {
        return [
            { id: 'fa', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'ta', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'v', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'ti', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'gl', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'gp', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'nt', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'h', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'tsig', byteLength: 64, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'tds', byteLength: 4, dependency: 'td', deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); }, serialize: function (x) { return xpll.typeConverter.U32ToBytes(x.length); } },
            { id: 'td', byteLength: 'tds', dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) {
                    // serialize calldata and return result
                    return xpll.serializeCalldata(x);
                } },
        ];
    };
    // --------------------------------------------__END TRANSACTION__-------------------------------------------------------------------------//
    // --------------------------------------------__START BLOCK__-------------------------------------------------------------------------//
    xpll.Block = function () {
        return [
            { id: 'fa', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'ta', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'v', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'ti', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'gl', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'gp', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'nt', byteLength: 8, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); }, serialize: function (x) { return xpll.typeConverter.U64ToBytes(x); } },
            { id: 'h', byteLength: 32, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'tsig', byteLength: 64, dependency: '', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); }, serialize: function (x) { return xpll.typeConverter.base64ToUint8Array(x); } },
            { id: 'tds', byteLength: 4, dependency: 'td', deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); }, serialize: function (x) { return xpll.typeConverter.U32ToBytes(x.length); } },
            { id: 'td', byteLength: 'tds', dependency: '', deserialize: function (buffer) { return buffer; }, serialize: function (x) {
                    // serialize calldata and return result
                    return xpll.serializeCalldata(x);
                } },
        ];
    };
    xpll.BlockHeader = function () {
        return [
            { id: 'bi', byteLength: 8, deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); } },
            { id: 'bv', byteLength: 8, deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); } },
            { id: 't', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
            { id: 'hp', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hi', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hs', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'ht', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'hr', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'p', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
            { id: 'sig', byteLength: 64, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } }
        ];
    };
    xpll.BlockData = function () { return ([
        { id: 'tds', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'rds', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'Dt', byteLength: 'tds', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'Dr', byteLength: 'rds', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    // --------------------------------------------__END BLOCK__-------------------------------------------------------------------------//
    xpll.Event = function () { return ([
        { id: 'ts', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'vs', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 't', byteLength: 'ts', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'v', byteLength: 'vs', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    xpll.TransactionReceipt = function () { return ([
        { id: 'sc', byteLength: 1, deserialize: function (buffer) { return buffer[0]; } },
        { id: 'gc', byteLength: 8, deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); } },
        { id: 'rvs', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'es', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'rv', byteLength: 'rvs', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'e', byteLength: 'es', deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } }
    ]); };
    xpll.MerkleProof = function () { return ([
        { id: 'rh', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'tlc', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToBigInt(buffer); } },
        { id: 'lis', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'lhs', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'ps', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'li', byteLength: 'lis', deserialize: function (buffer) { return xpll.deserializeIntoArrayU32(buffer); } },
        { id: 'lh', byteLength: 'lhs', deserialize: function (buffer) { return xpll.byteConcatenate(buffer); } },
        { id: 'prf', byteLength: 'ps', deserialize: function (buffer) { return buffer; } }
    ]); };
    xpll.StateProof = function () { return ([
        { id: 'rh', byteLength: 32, deserialize: function (buffer) { return xpll.typeConverter.bytesToBase64URL(buffer); } },
        { id: 'si', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'sp', byteLength: 4, deserialize: function (buffer) { return xpll.typeConverter.bytesToInt32LE(buffer); } },
        { id: 'pi', byteLength: 'si', deserialize: function (buffer) { return xpll.deserializeItems(buffer); } },
        { id: 'pp', byteLength: 'sp', deserialize: function (buffer) { return xpll.deserializeListofLists(buffer); } }
    ]); };
    xpll.serialize = function (struct, obj) {
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
    xpll.serializeCalldata = function (calldata) {
        var mn = xpll.typeConverter.UTF8ToBytes(calldata.mn, 0); //mns
        var a = xpll.borshSerialize(calldata.a); //as
        var mns = xpll.typeConverter.U32ToBytes(mn.length, 4); //4
        var as = xpll.typeConverter.U32ToBytes(a.length, 4); //4
        var padding = new Uint8Array([0, 0, 0, 0]);
        var serializedCallData = concatArr(padding, concatArr(mns, concatArr(as, concatArr(mn, a))));
        return serializedCallData;
    };
    xpll.borshSerialize = function (data) {
        var borshSerialization = new Uint8Array([]);
        var arg1 = xpll.typeConverter.U32ToBytes(data.length);
        borshSerialization = concatArr(borshSerialization, arg1);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var arg2 = xpll.typeConverter.U32ToBytes(item.length);
                var arg3 = item;
                borshSerialization = concatArr(borshSerialization, concatArr(arg2, arg3));
            }
        }
        return borshSerialization;
    };
    // --------------------------------------------__END SERIALIZATION__-------------------------------------------------------------------------//
    // --------------------------------------------__START DESERIALIZATION__-------------------------------------------------------------------------//
    xpll.deserialize = function (struct, bytes) {
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
    xpll.byteConcatenate = function (bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 32) {
            var data = (bytes.slice(i, i + 32));
            result.push(data);
        }
        return result;
    };
    xpll.deserializeIntoArrayU32 = function (bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            var data = xpll.typeConverter.bytesToInt32LE(bytes.slice(i, i + 4));
            result.push(data);
        }
        return result;
    };
    xpll.deserializeOptions = function (bytes) {
        return bytes.slice(1);
    };
    xpll.deserializeListofLists = function (bytes) {
        var n = xpll.typeConverter.bytesToInt32LE(bytes.slice(0, 4));
        var size = [];
        var sizeCount = 0;
        var j = 0;
        var result = [];
        for (var i = 1; i < n + 1; i++) {
            size.push(xpll.typeConverter.bytesToInt32LE(bytes.slice(i * 4, (i + 1) * 4)));
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
    xpll.deserializeItems = function (bytes) {
        var cursor = 0;
        var itemsSize = xpll.typeConverter.bytesToInt32LE(bytes.slice(0, 4));
        cursor += 4;
        var size = [];
        var sizeCount = 0;
        var result = [];
        for (var i = 0; i < itemsSize; i++) {
            size.push(xpll.typeConverter.bytesToInt32LE(bytes.slice(cursor, cursor + 4)));
            cursor += 4;
        }
        while (cursor < bytes.length) {
            var itemSize = size[sizeCount];
            var item = bytes.slice(cursor, cursor + itemSize);
            var size1 = xpll.typeConverter.bytesToInt32LE(item.slice(0, 4));
            var size2 = xpll.typeConverter.bytesToInt32LE(item.slice(4, 8));
            var entry1 = item.slice(8, 8 + size1);
            var entry2 = item.slice(8 + size1, 8 + size1 + size2);
            entry2 = xpll.deserializeOptions(entry2);
            result.push([entry1, entry2]);
            cursor += itemSize;
            sizeCount++;
        }
        return result;
    };
    // --------------------------------------------__END DESERIALIZATION__-------------------------------------------------------------------------//
})(typeof module !== "undefined" && module.exports ? module.exports : (self.xpll = self.xpll || {}));
