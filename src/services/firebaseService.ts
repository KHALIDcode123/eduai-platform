import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { Assessment, Submission, Rubric, User } from "@/types";

// ─── Assessments ─────────────────────────────────────────────────────────────

export async function createAssessment(assessment: Omit<Assessment, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const docRef = await addDoc(collection(db, "assessments"), {
    ...assessment,
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id, ...assessment, createdAt: now, updatedAt: now };
}

export async function getAssessment(id: string): Promise<Assessment | null> {
  const docRef = doc(db, "assessments", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Assessment;
  }
  return null;
}

export async function getAssessmentsByTeacher(teacherId: string): Promise<Assessment[]> {
  const q = query(
    collection(db, "assessments"),
    where("teacherId", "==", teacherId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Assessment));
}

export async function updateAssessment(id: string, data: Partial<Assessment>) {
  const docRef = doc(db, "assessments", id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
}

export async function deleteAssessment(id: string) {
  await deleteDoc(doc(db, "assessments", id));
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export async function createSubmission(submission: Omit<Submission, "id" | "submittedAt">) {
  const docRef = await addDoc(collection(db, "submissions"), {
    ...submission,
    submittedAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...submission, submittedAt: new Date().toISOString() };
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const docRef = doc(db, "submissions", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Submission;
  }
  return null;
}

export async function getSubmissionsByAssessment(assessmentId: string): Promise<Submission[]> {
  const q = query(
    collection(db, "submissions"),
    where("assessmentId", "==", assessmentId),
    orderBy("submittedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Submission));
}

export async function getSubmissionsByStudent(studentId: string): Promise<Submission[]> {
  const q = query(
    collection(db, "submissions"),
    where("studentId", "==", studentId),
    orderBy("submittedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Submission));
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  const docRef = doc(db, "submissions", id);
  await updateDoc(docRef, data);
}

// ─── Rubrics ─────────────────────────────────────────────────────────────────

export async function createRubric(rubric: Omit<Rubric, "id" | "createdAt">) {
  const docRef = await addDoc(collection(db, "rubrics"), {
    ...rubric,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...rubric, createdAt: new Date().toISOString() };
}

export async function getRubric(id: string): Promise<Rubric | null> {
  const docRef = doc(db, "rubrics", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Rubric;
  }
  return null;
}

// ─── File Upload ─────────────────────────────────────────────────────────────

export async function uploadAudioFile(file: File, userId: string): Promise<string> {
  const timestamp = Date.now();
  const fileName = `audio/${userId}/${timestamp}_${file.name}`;
  const storageRef = ref(storage, fileName);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function getUser(userId: string): Promise<User | null> {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
}
