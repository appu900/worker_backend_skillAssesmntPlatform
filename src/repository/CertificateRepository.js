
import StudentCertificate from "../models/Certificate.js";

class CertificateRepository{
   async create(data){
    try {
        const response = await StudentCertificate.create(data);
        return response;
    } catch (error) {
        throw error;
    }
   }
}

export default CertificateRepository;