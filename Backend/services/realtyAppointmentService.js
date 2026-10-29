import { ObjectId } from "mongodb";
import { getDatabase } from "../config/mongo.js";

function toId(value) {
    const id = String(value ?? "");
    return /^[0-9a-f]{24}$/i.test(id) ? new ObjectId(id) : id;
}

function toAppointment(doc) {
    if (!doc) return null;

    const { _id, ...rest } = doc;
    return { ...rest, id: String(_id) };
}

async function getRealtyAppointmentCollection() {
    const db = await getDatabase();
    return db.collection("realty_appointments");
}

export async function getRealtyAppointmentsService() {
    const collection = await getRealtyAppointmentCollection();
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();

    return { data: docs, error: null };
}

export async function createRealtyAppointmentService(payload) {
    const collection = await getRealtyAppointmentCollection();
    const result = await collection.insertOne({
        ...payload,
        status: "pending",
        created_at: new Date().toISOString(),
    });

    const created = await collection.findOne({ _id: result.insertedId });

    return { data: created ? [toAppointment(created)] : [], error: null };
}

export async function confirmRealtyAppointmentService(id) {
    const collection = await getRealtyAppointmentCollection();
    let updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: { status: "confirmed" } },
        { returnDocument: "after" }
    );

    if (!updated.value) {
        updated = await collection.findOneAndUpdate(
            { _id: id },
            { $set: { status: "confirmed" } },
            { returnDocument: "after" }
        );
    }

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function cancelRealtyAppointmentService(id) {
    const collection = await getRealtyAppointmentCollection();
    let updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: { status: "cancelled" } },
        { returnDocument: "after" }
    );

    if (!updated.value) {
        updated = await collection.findOneAndUpdate(
            { _id: id },
            { $set: { status: "cancelled" } },
            { returnDocument: "after" }
        );
    }

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function archiveRealtyAppointmentService(id) {
    const collection = await getRealtyAppointmentCollection();
    const updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: { status: "archived" } },
        { returnDocument: "after" }
    );

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function getRealtyAppointmentByIdService(id) {
    const collection = await getRealtyAppointmentCollection();
    let doc = await collection.findOne({ _id: toId(id) });

    if (!doc) {
        doc = await collection.findOne({ _id: id });
    }

    return { data: toAppointment(doc), error: null };
}

export async function updateRealtyAppointmentService(id, payload) {
    const collection = await getRealtyAppointmentCollection();
    const updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: payload },
        { returnDocument: "after" }
    );

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function deleteRealtyAppointmentService(id) {
    const collection = await getRealtyAppointmentCollection();
    const deleted = await collection.findOneAndDelete({
        _id: toId(id),
    });

    return {
        data: deleted.value ? [toAppointment(deleted.value)] : [],
        error: null,
    };
}
