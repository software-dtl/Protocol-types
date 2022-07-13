const pchain = require('../index')

// test('serializeTransaction', ()=>{
//     const arr = new Uint8Array([94, 6, 139, 173, 210, 60, 105, 123, 6, 94, 236, 229, 97, 5, 191, 212, 241, 135, 210, 137, 112, 25, 48, 234, 12, 230, 65, 123, 124, 213, 111, 6, 38, 3, 156, 5, 201, 12, 87, 68, 233, 49, 22, 111, 190, 6, 5, 120, 195, 244, 200, 254, 12, 135, 41, 78, 137, 54, 10, 180, 10, 87, 155, 108, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 66, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 40, 0, 0, 0, 105, 110, 105, 116, 105, 97, 116, 101, 95, 115, 116, 97, 107, 101, 1, 0, 0, 0, 32, 0, 0, 0, 94, 6, 139, 173, 210, 60, 105, 123, 6, 94, 236, 229, 97, 5, 191, 212, 241, 135, 210, 137, 112, 25, 48, 234, 12, 230, 65, 123, 124, 213, 111, 6]) 
//     expect(pchain.serialize(pchain.Transaction(), {
//         fa: returnBase64URLFromBytes(0,32),
//         ta: returnBase64URLFromBytes(1,32),
//         v: 1,
//         ti: 2,
//         gl: 3,
//         gp: 4,
//         nt: 5,
//         h: "CwwNDg8QERITFAsMDQ4PEBESExQLDA0ODxAREhMUFRY",
//         tsig: "FxgZGhscHR4fIBcYGRobHB0eHyAXGBkaGxwdHh8gFxgZGhscHR4fIBcYGRobHB0eHyAXGBkaGxwdHh8gISIjJA",
//         td: returnBase64URLFromBytes()
//     }).toString()).toBe(arr.toString())
// })

test('deserializeTransaction', ()=>{
    const arr = new Uint8Array([ 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 100, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
        expect(toObject(pchain.deserialize(pchain.Transaction(), arr))).toBe(toObject({
        fa: returnBase64URLFromBytes(0, 32),
        ta: returnBase64URLFromBytes(1, 32),
        v: 1,
        ti: 2,
        gl: 3,
        gp: 4,
        nt: 5,
        h: returnBase64URLFromBytes(3, 32),
        tsig: returnBase64URLFromBytes(4, 64),
        tds: 100,
        td: returnBase64URLFromBytes(2, 100)
    }))
})

test('deserializeBlockHeader', ()=>{
    const arr = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
    expect(toObject(pchain.deserialize(pchain.BlockHeader(), arr))).toBe(toObject({
        bi :1,
        bv : 2,
        t : 3,
        hp : returnBase64URLFromBytes(1,32),
        hi : returnBase64URLFromBytes(2,32),
        hs : returnBase64URLFromBytes(4,32),
        ht : returnBase64URLFromBytes(3,32),
        hr : returnBase64URLFromBytes(6,32),
        p : returnBase64URLFromBytes(7,32),
        sig : returnBase64URLFromBytes(8,64)
    }))
})

test('deserializeEvent', ()=>{
    const arr = new Uint8Array([
        3, 0, 0, 0, 2, 0, 0, 0, 197, 148, 219, 216, 183
    ]) 
    expect(toObject(pchain.deserialize(pchain.Event(), arr))).toBe(toObject({
        ts: 3,
        vs: 2,
        t: pchain.typeConverter.bytesToBase64URL(new Uint8Array([197, 148, 219])),
        v: pchain.typeConverter.bytesToBase64URL(new Uint8Array([216, 183]))
    }))
})


test('deserializeReceipt', ()=>{
    const arr = new Uint8Array([
        41, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 197, 148, 219, 216, 183
    ]) 
    expect(toObject(pchain.deserialize(pchain.TransactionReceipt(), arr))).toBe(toObject({
        sc: 41,
        gc: 102,
        rvs: 0,
        es: 13,
        rv: returnBase64URLFromBytes(0,0),
        e: pchain.typeConverter.bytesToBase64URL(new Uint8Array([ 3, 0, 0, 0, 2, 0, 0, 0, 197, 148, 219, 216, 183]))
    }))
})


test('deserializeMerkleProof', ()=>{
    const arr = new Uint8Array([
        162, 135, 202, 84, 170, 10, 149, 47, 94, 49, 100, 155, 207, 181, 174, 84, 30, 128, 138, 185, 249, 96, 117, 
        82, 192, 177, 236, 1, 113, 128, 255, 91, 123, 0, 0, 0, 12, 0, 0, 0, 96, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 4,
        0, 0, 0, 100, 0, 0, 0, 156, 153, 158, 224, 124, 143, 66, 64, 98, 99, 45, 137, 100, 75, 215, 26, 0, 129, 25, 177, 
        206, 101, 0, 108, 191, 189, 17, 228, 5, 0, 28, 56, 246, 22, 30, 59, 254, 140, 189, 88, 46, 79, 35, 215, 194, 45,
        68, 4, 221, 96, 1, 194, 242, 149, 167, 39, 83, 216, 241, 75, 213, 110, 213, 239, 153, 140, 66, 142, 135, 193, 207,
        244, 163, 25, 10, 7, 0, 191, 244, 211, 59, 249, 148, 10, 129, 163, 106, 101, 191, 89, 100, 168, 173, 230, 77, 
        179, 249, 35, 163, 80, 13, 88, 108, 61, 3, 220
    ]) 
    expect(toObject(pchain.deserialize(pchain.MerkleProof(), arr))).toBe(toObject({
        rh: pchain.typeConverter.bytesToBase64URL(new Uint8Array([162, 135, 202, 84, 170, 10, 149, 47, 94, 49, 100, 155, 207, 181, 174, 84, 30, 128, 138, 185, 249, 96, 117, 
            82, 192, 177, 236, 1, 113, 128, 255, 91])),
        tlc: 123,
        lis: 12,
        lhs: 96,
        ps: 10,
        li: [0, 4, 100],
        lh: [
            new Uint8Array([156, 153, 158, 224, 124, 143, 66, 64, 98, 99, 45, 137, 100, 75, 215, 26, 0, 129, 25, 177, 206, 101, 0, 108, 191, 189, 17, 228, 5, 0, 28, 56]), 
            new Uint8Array([246, 22, 30, 59, 254, 140, 189, 88, 46, 79, 35, 215, 194, 45, 68, 4, 221, 96, 1, 194, 242, 149, 167, 39, 83, 216, 241, 75, 213, 110, 213, 239]), 
            new Uint8Array([153, 140, 66, 142, 135, 193, 207, 244, 163, 25, 10, 7, 0, 191, 244, 211, 59, 249, 148, 10, 129, 163, 106, 101, 191, 89, 100, 168, 173, 230, 77, 179])
        ], 
        prf: new Uint8Array([249, 35, 163, 80, 13, 88, 108, 61, 3, 220])
    }))
})

test('deserializeStateProof', ()=>{
    const arr = new Uint8Array([
        135, 132, 83, 250, 22, 202, 83, 197, 230, 107, 212, 244, 77, 77, 207, 182, 
        49, 8, 147, 189, 139, 231, 202, 191, 218, 238, 178, 77, 8, 42, 177, 84, 
        68, 0, 0, 0, 43, 0, 0, 0, 3, 0, 0, 0, 16, 0, 0, 0, 14, 0, 0, 0, 22, 0, 0, 0,
        3, 0, 0, 0, 5, 0, 0, 0, 220, 156, 174, 1, 68, 226, 24, 180, 5, 0, 0, 0, 1, 0, 0, 0,
        103, 70, 155, 16, 224, 0, 6, 0, 0, 0, 8, 0, 0, 0, 63, 225, 95, 254, 30, 194, 1,
        189, 38, 77, 79, 31, 193, 253, 3, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 10, 0, 0, 0, 
        11, 139, 91, 77, 122, 60, 44, 146, 4, 20, 112, 176, 136, 174, 169, 24, 196, 182, 135, 
        228, 56, 213, 171, 92, 40, 37, 52]) 
    expect(toObject(pchain.deserialize(pchain.StateProof(), arr))).toBe(toObject({
        rh: pchain.typeConverter.bytesToBase64URL(new Uint8Array([135, 132, 83, 250, 22, 202, 83, 197, 230, 107, 212, 244, 77, 77, 207, 182, 49, 8, 147, 189, 139, 231, 202, 191, 218, 238, 178, 77, 8, 42, 177, 84])),
        si: 68,
        sp: 43,
        pi: [
            [new Uint8Array([220, 156, 174]), new Uint8Array([68, 226, 24, 180])],
            [new Uint8Array([103, 70, 155, 16, 224]),new Uint8Array([])],
            [new Uint8Array([63, 225, 95, 254, 30, 194]),new Uint8Array([189, 38, 77, 79, 31, 193, 253])]
        ],
        pp: [
            new Uint8Array([11, 139, 91, 77, 122, 60, 44, 146]), 
            new Uint8Array([4, 20, 112, 176, 136, 174, 169, 24, 196]), 
            new Uint8Array([182, 135, 228, 56, 213, 171, 92, 40, 37, 52])
        ],
    }))
})


// ---------------------------------------AUXILLARY FUNCTION TESTS----------------------------------------------------//

// test('bytesToInt32', ()=>{
//     expect(pchain.typeConverter.bytesToInt32LE(new Uint8Array([5,0,0,0]))).toBe(5)
// })

// test('listOfList', ()=>{
//     expect(pchain.deserializeListofLists(new Uint8Array([156, 153, 158, 224, 124, 143, 66, 64, 98, 99, 45, 137, 100, 75, 215, 26, 0, 129, 25, 177, 206, 101, 0, 108, 191, 189, 17, 228, 5, 0, 28, 56, 246, 22, 30, 59, 254, 140, 189, 88, 46, 79, 35, 215, 194, 45, 68, 4, 221, 96, 1, 194, 242, 149, 167, 39, 83, 216, 241, 75, 213, 110, 213, 239, 153, 140, 66, 142, 135, 193, 207, 244, 163, 25, 10, 7, 0, 191, 244, 211, 59, 249, 148, 10, 129, 163, 106, 101, 191, 89, 100, 168, 173, 230, 77, 179]), 3).toString())
//     .toBe([
//         new Uint8Array([156, 153, 158, 224, 124, 143, 66, 64, 98, 99, 45, 137, 100, 75, 215, 26, 0, 129, 25, 177, 206, 101, 0, 108, 191, 189, 17, 228, 5, 0, 28, 56]), 
//         new Uint8Array([246, 22, 30, 59, 254, 140, 189, 88, 46, 79, 35, 215, 194, 45, 68, 4, 221, 96, 1, 194, 242, 149, 167, 39, 83, 216, 241, 75, 213, 110, 213, 239]), 
//         new Uint8Array([153, 140, 66, 142, 135, 193, 207, 244, 163, 25, 10, 7, 0, 191, 244, 211, 59, 249, 148, 10, 129, 163, 106, 101, 191, 89, 100, 168, 173, 230, 77, 179])
//     ].toString())
// })

// test('listNum', ()=>{
//     expect(pchain.deserializeListNum(new Uint8Array([5, 0, 0, 0, 8, 0, 0, 0, 12, 127, 40, 222, 185, 123, 0, 0, 0, 0, 0, 0, 0])).toString())
//     .toBe([
//         [12, 127, 40, 222, 185], 123
//     ].toString())
// })

// test('optionsList', ()=>{
//     expect(pchain.deserializeOptionsList([]).toString())
//     .toBe(new Uint8Array([
//         0
//     ]).toString())
// })

// test('optionsList', ()=>{
//     expect(pchain.deserializeOptionsList([83, 241, 49, 226, 41]).toString())
//     .toBe(new Uint8Array([
//         1, 83, 241, 49, 226, 41
//     ]).toString())
// })

// test('deserializeIntoArrayU32', ()=>{
//     expect(pchain.deserializeIntoArrayU32([0, 0, 0,0, 4, 0, 0, 0, 100,0,0,0]).toString())
//     .toBe(new Uint8Array([
//         0, 4, 100
//     ]).toString())
// })








function toObject(object) {
    return JSON.stringify(object, (key, value) =>
        typeof value === 'bigint'
            ? Number(value)
            : value // return everything else unchanged
    );
}

function returnBase64URLFromBytes(x,n)  {
    
    const result = returnBytes(x,n)

    return pchain.typeConverter.bytesToBase64URL(result);
}

function returnBytes(x,n)  {
    
    let result = new Uint8Array([]);
    
    for(let i=0;i<n; i++){
        result = [...result, x]
    }

    return result
}