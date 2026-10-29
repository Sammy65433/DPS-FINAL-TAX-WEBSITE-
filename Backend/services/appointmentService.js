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

function toAppointments(docs) {
    return (docs ?? []).map(toAppointment);
}

async function getAppointmentCollection() {
    const db = await getDatabase();
    return db.collection("appointments");
}

export async function getAppointmentsService() {
    const collection = await getAppointmentCollection();
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();

    return { data: toAppointments(docs), error: null };
}

export async function getAvailabilityService(date, preparer) {
    const collection = await getAppointmentCollection();
    const docs = await collection
        .find({
            appointment_date: date,
            tax_preparer: preparer,
            status: { $in: ["booked", "confirmed"] },
        })
        .toArray();

    return { data: docs, error: null };
}

export async function findExistingAppointmentSlotService({
    appointment_date,
    tax_preparer,
}) {
    const collection = await getAppointmentCollection();
    const docs = await collection
        .find({
            appointment_date,
            tax_preparer,
            status: { $in: ["booked", "confirmed"] },
        })
        .toArray();

    return { data: docs, error: null };
}

export async function findManagedAppointmentByTokenService(tokenHash) {
    const collection = await getAppointmentCollection();
    const doc = await collection.findOne({
        manage_token_hash: tokenHash,
        manage_token_expires_at: { $gt: new Date() },
    });

    return { data: doc, error: null };
}

export async function createAppointmentService(payload) {
    const collection = await getAppointmentCollection();
    const result = await collection.insertOne({
        ...payload,
        status: "booked",
        created_at: new Date().toISOString(),
    });

    const created = await collection.findOne({ _id: result.insertedId });

    return { data: created ? [toAppointment(created)] : [], error: null };
}

export async function confirmAppointmentService(id) {
    const collection = await getAppointmentCollection();
    const updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: { status: "confirmed" } },
        { returnDocument: "after" }
    );

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function cancelAppointmentService(id) {
    const collection = await getAppointmentCollection();
    const updated = await collection.findOneAndUpdate(
        { _id: toId(id) },
        { $set: { status: "cancelled" } },
        { returnDocument: "after" }
    );

    return {
        data: updated.value ? [toAppointment(updated.value)] : [],
        error: null,
    };
}

export async function archiveAppointmentService(id) {
    const collection = await getAppointmentCollection();
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

export async function getAppointmentByIdService(id) {
    const collection = await getAppointmentCollection();
    const doc = await collection.findOne({ _id: toId(id) });

    return { data: toAppointment(doc), error: null };
}

export async function findConflictingAppointmentService({
    id,
    appointment_date,
    tax_preparer,
}) {
    const collection = await getAppointmentCollection();
    const docs = await collection
        .find({
            appointment_date,
            tax_preparer,
            status: { $in: ["booked", "confirmed"] },
            _id: { $ne: toId(id) },
        })
        .toArray();

    return { data: docs, error: null };
}

export async function updateAppointmentService(id, payload) {
    const collection = await getAppointmentCollection();
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

export async function deleteAppointmentService(id) {
    const collection = await getAppointmentCollection();
    const deleted = await collection.findOneAndDelete({
        _id: toId(id),
    });

    return {
        data: deleted.value ? [toAppointment(deleted.value)] : [],
        error: null,
    };
}
