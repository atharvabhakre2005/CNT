package com.example.vitresult.repository;

import com.example.vitresult.model.StudentResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<StudentResult, String> {
}
