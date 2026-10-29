import { getDatabase } from "../config/mongo.js";
import { ObjectId } from "mongodb";

const COLLECTION = "customers";

function toId(value) {
    if (value instanceof ObjectId) return value;
    if (typeof value === "string" && /^[a-f0-9]{24}$/i.test(value)) {
        return new ObjectId(value);
    }
    return value;
}

function toCustomer(doc) {
    if (!doc) return null;
    const { _id, password, ...rest } = doc;
    return { id: String(_id), ...rest };
}

export async function findCustomerByEmailService(email) {
    const db = getDatabase();
    const customer = await db
        .collection(COLLECTION)
        .findOne({ email: String(email).trim().toLowerCase() });
    return { data: toCustomer(customer), raw: customer, error: null };
}

export async function findCustomerByIdService(id) {
    const db = getDatabase();
    let customer = null;
    try {
        customer = await db
            .collection(COLLECTION)
            .findOne({ _id: toId(id) });
    } catch (error) {
        return { data: null, raw: null, error };
    }
    return { data: toCustomer(customer), raw: customer, error: null };
}

export async function createCustomerService(fields) {
    const db = getDatabase();
    const now = new Date().toISOString();
    const doc = {
        email: String(fields.email).trim().toLowerCase(),
        password: fields.password,
        firstName: String(fields.firstName ?? "").trim(),
        lastName: String(fields.lastName ?? "").trim(),
        phone: String(fields.phone ?? "").trim(),
        emailConfirmed: false,
        confirmTokenHash: fields.confirmTokenHash ?? null,
        confirmTokenExpiresAt: fields.confirmTokenExpiresAt ?? null,
        resetTokenHash: null,
        resetTokenExpiresAt: null,
        role: "customer",
        createdAt: now,
        updatedAt: now,
    };

    try {
        const result = await db.collection(COLLECTION).insertOne(doc);
        const created = { ...doc, _id: result.insertedId };
        return { data: toCustomer(created), raw: created, error: null };
    } catch (error) {
        return { data: null, raw: null, error };
    }
}

export async function updateCustomerService(id, fields) {
    const db = getDatabase();
    const update = { ...fields, updatedAt: new Date().toISOString() };
    try {
        const result = await db.collection(COLLECTION).findOneAndUpdate(
            { _id: toId(id) },
            { $set: update },
            { returnDocument: "after" }
        );
        const value = result?.value ?? result;
        return { data: toCustomer(value), raw: value, error: null };
    } catch (error) {
        return { data: null, raw: null, error };
    }
}

export { toId };
