import mongoose from "mongoose";
import Student from "../models/Student.js";
import CertificateRepository from "../repository/CertificateRepository.js";

const certificateRepo = new CertificateRepository();

class CertificateService {
  async fetchStudentDetails(studentId) {
    try {
      const student = await Student.findById(studentId);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async createCertificate(data) {
    try {
      const response = await certificateRepo.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async generateCertificate(
    studentId,
    batchId,
    examId,
    courseName,
    courseCredit,
    courseLevel,
    trainingCenter,
    duration
  ) {
    try {
      const student = await this.fetchStudentDetails(studentId);
      let payload = {};
      if (student.absent === false) {
        payload = {
          studentName: student.name,
          stutentProfilePic: student.profilepic,
          studentId:student._id,
          batchId: batchId,
          fatherName: student.fathername,
          DOB: student.dob,
          Enrolment_number: student.redg_No,
          qualification: courseName,
          duration: duration,
          credit: courseCredit,
          level: courseLevel,
          TrainingCenter: trainingCenter,
          District: student.district,
          state: student.state,
          grade: student.Grade,
          placeOfIssue: "Bhubaneswar",
          DateOfIssue: new Date(),
        };
        const Certificate = await this.createCertificate(payload);
        console.log(Certificate)
      }
      
    } catch (error) {
      throw error;
    }
  }
}

export default CertificateService;
