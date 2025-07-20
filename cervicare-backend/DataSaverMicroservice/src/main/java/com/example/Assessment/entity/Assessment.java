package com.example.Assessment.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;
    private Integer numberOfPregnancies;
    private Integer smokes;
    private Integer hormonalContraceptives;
    private Integer stds;
    private Integer hpv;
    private Integer iud;
    private Integer stdsNumber;
    private Integer firstSexualIntercourseAge;
    private Integer stdsCondylomatosis;
    private Integer stdsCervicalCondylomatosis;
    private Integer stdsVaginalCondylomatosis;
    private Integer stdsVulvoPerinealCondylomatosis;
    private Integer stdsSyphilis;
    private Integer stdsPelvicInflammatoryDisease;
    private Integer stdsGenitalHerpes;
    private Integer stdsMolluscumContagiosum;
    private Integer stdsHiv;
    private Integer stdsHepatitisB;
    private Integer stdsHpv;
    private Integer dx;
    private Integer dxCancer;
    private Integer dxCin;

    private Integer biopsyRiskPrediction;
    private Float confidence;
    private String screeningRecommendation;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Integer getNumberOfPregnancies() { return numberOfPregnancies; }
    public void setNumberOfPregnancies(Integer numberOfPregnancies) { this.numberOfPregnancies = numberOfPregnancies; }

    public Integer getSmokes() { return smokes; }
    public void setSmokes(Integer smokes) { this.smokes = smokes; }

    // Add remaining getters and setters as needed

    @Override
    public String toString() {
        return "Assessment{" +
                "id=" + id +
                ", age=" + age +
                ", numberOfPregnancies=" + numberOfPregnancies +
                ", smokes=" + smokes +
                ", hormonalContraceptives=" + hormonalContraceptives +
                ", stds=" + stds +
                ", hpv=" + hpv +
                ", iud=" + iud +
                ", stdsNumber=" + stdsNumber +
                ", firstSexualIntercourseAge=" + firstSexualIntercourseAge +
                ", stdsCondylomatosis=" + stdsCondylomatosis +
                ", stdsCervicalCondylomatosis=" + stdsCervicalCondylomatosis +
                ", stdsVaginalCondylomatosis=" + stdsVaginalCondylomatosis +
                ", stdsVulvoPerinealCondylomatosis=" + stdsVulvoPerinealCondylomatosis +
                ", stdsSyphilis=" + stdsSyphilis +
                ", stdsPelvicInflammatoryDisease=" + stdsPelvicInflammatoryDisease +
                ", stdsGenitalHerpes=" + stdsGenitalHerpes +
                ", stdsMolluscumContagiosum=" + stdsMolluscumContagiosum +
                ", stdsHiv=" + stdsHiv +
                ", stdsHepatitisB=" + stdsHepatitisB +
                ", stdsHpv=" + stdsHpv +
                ", dx=" + dx +
                ", dxCancer=" + dxCancer +
                ", dxCin=" + dxCin +
                '}';
    }
}
