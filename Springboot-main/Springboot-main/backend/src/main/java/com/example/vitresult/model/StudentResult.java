package com.example.vitresult.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

@Document(collection = "student_results")
public class StudentResult {
    @Id
    private String id;

    @NotBlank
    private String studentName;

    @NotBlank
    private String rollNo;

    @Min(0) @Max(30) private double mse1;
    @Min(0) @Max(30) private double mse2;
    @Min(0) @Max(30) private double mse3;
    @Min(0) @Max(30) private double mse4;

    @Min(0) @Max(70) private double ese1;
    @Min(0) @Max(70) private double ese2;
    @Min(0) @Max(70) private double ese3;
    @Min(0) @Max(70) private double ese4;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public double getMse1() { return mse1; }
    public void setMse1(double mse1) { this.mse1 = mse1; }
    public double getMse2() { return mse2; }
    public void setMse2(double mse2) { this.mse2 = mse2; }
    public double getMse3() { return mse3; }
    public void setMse3(double mse3) { this.mse3 = mse3; }
    public double getMse4() { return mse4; }
    public void setMse4(double mse4) { this.mse4 = mse4; }

    public double getEse1() { return ese1; }
    public void setEse1(double ese1) { this.ese1 = ese1; }
    public double getEse2() { return ese2; }
    public void setEse2(double ese2) { this.ese2 = ese2; }
    public double getEse3() { return ese3; }
    public void setEse3(double ese3) { this.ese3 = ese3; }
    public double getEse4() { return ese4; }
    public void setEse4(double ese4) { this.ese4 = ese4; }

    public double totalForSubject(double mse, double ese) {
        return (mse * 0.3) + (ese * 0.7);
    }

    public double getTotalMarks() {
        return totalForSubject(mse1, ese1)
             + totalForSubject(mse2, ese2)
             + totalForSubject(mse3, ese3)
             + totalForSubject(mse4, ese4);
    }

    public double getCgpa() {
        return (getTotalMarks() / 400.0) * 10.0;
    }
}
