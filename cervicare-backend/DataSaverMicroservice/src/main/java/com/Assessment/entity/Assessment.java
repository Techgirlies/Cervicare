package com.yourpackage.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "assessments")
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer age;
    @NotNull
    private Integer numberOfPregnancies;
    @NotNull
    private Integer smokes;
    @NotNull
    private Integer hormonalContraceptives;
    @NotNull
    private Integer stds;
    @NotNull
    private Integer hpv;
    @NotNull
    private Integer iud;
    @NotNull
    private Integer stdsNumber;
    @NotNull
    private Integer firstSexualIntercourseAge;
    @NotNull
    private Integer stdsCondylomatosis;
    @NotNull
    private Integer stdsCervicalCondylomatosis;
    @NotNull
    private Integer stdsVaginalCondylomatosis;
    @NotNull
    private Integer stdsVulvoPerinealCondylomatosis;
    @NotNull
    private Integer stdsSyphilis;
    @NotNull
    private Integer stdsPelvicInflammatoryDisease;
    @NotNull
    private Integer stdsGenitalHerpes;
    @NotNull
    private Integer stdsMolluscumContagiosum;
    @NotNull
    private Integer stdsHiv;
    @NotNull
    private Integer stdsHepatitisB;
    @NotNull
    private Integer stdsHpv;
    @NotNull
    private Integer dx;
    @NotNull
    private Integer dxCancer;
    @NotNull
    private Integer dxCin;

    private Integer biopsyRiskPrediction;
    private Float confidence;
    private String screeningRecommendation;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getNumberOfPregnancies() {
        return numberOfPregnancies;
    }

    public void setNumberOfPregnancies(Integer numberOfPregnancies) {
        this.numberOfPregnancies = numberOfPregnancies;
    }

    public Integer getSmokes() {
        return smokes;
    }

    public void setSmokes(Integer smokes) {
        this.smokes = smokes;
    }

    // Other getters and setters...

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
