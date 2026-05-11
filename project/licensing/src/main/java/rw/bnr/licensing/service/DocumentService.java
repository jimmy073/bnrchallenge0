package rw.bnr.licensing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rw.bnr.licensing.entity.Application;
import rw.bnr.licensing.entity.ApplicationDocument;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.exception.FileUploadException;
import rw.bnr.licensing.repository.ApplicationDocumentRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {
    @Autowired private ApplicationDocumentRepository documentRepository;
    private static final long MAX_FILE_SIZE =
            5 * 1024 * 1024;
    public void upload(Application application, MultipartFile file, User loggedInUser){

        try{
            if(file.isEmpty()){
                throw new FileUploadException("File is empty");
            }

            if(file.getSize()> MAX_FILE_SIZE){
                throw new FileUploadException("File is big, must be 5MB or less");
            }

            List<String> allowedTypes = List.of(
                    "application/pdf");
            if (!allowedTypes.contains(file.getContentType())) {
                throw new FileUploadException("Invalid file type");
            }
            String originalFileName =
                    file.getOriginalFilename();

            // generate unique stored file name
            //TODO make stored file name to have application Ref and file type name
            String storedFileName =
                    UUID.randomUUID() + "-" + originalFileName;

            // create upload path
            Path uploadPath = Paths.get(
                    "uploads",
                    application.getReferenceNumber()+UUID.randomUUID()
            );

            Files.copy(
                    file.getInputStream(),
                    uploadPath,
                    StandardCopyOption.REPLACE_EXISTING
            );


            ApplicationDocument document =
                    new ApplicationDocument();

            document.setApplication(application);

            document.setFileName(originalFileName);

            document.setStoredFileName(storedFileName);

            document.setFilePath(uploadPath.toString());

            document.setContentType(file.getContentType());

            document.setSize(file.getSize());

            document.setUploadedBy(loggedInUser);
            documentRepository.save(document);
        }
        catch (IOException ex){
            throw new RuntimeException("File can't be uploaded",ex);
        }
    }
}
