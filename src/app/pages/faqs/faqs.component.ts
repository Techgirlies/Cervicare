import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}


@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
    faqs: FAQItem[] = [
    {
      question: "What is cervical cancer?",
      answer: "Cervical cancer is a type of cancer that occurs in the cells of the cervix — the lower part of the uterus that connects to the vagina. Most cervical cancers are caused by various strains of the human papillomavirus (HPV), a sexually transmitted infection.",
      isOpen: false
    },
    {
      question: "What are the main causes of cervical cancer?",
      answer: "The primary cause of cervical cancer is persistent infection with high-risk types of human papillomavirus (HPV). Other risk factors include smoking, having multiple sexual partners, early sexual activity, other sexually transmitted infections, a weakened immune system, and long-term use of birth control pills.",
      isOpen: false
    },
    {
      question: "What are the early symptoms of cervical cancer?",
      answer: "Early cervical cancer often has no symptoms. As it progresses, symptoms may include abnormal vaginal bleeding (between periods, after menopause, or after intercourse), unusual vaginal discharge, pelvic pain, and pain during intercourse. Regular screening can detect changes before cancer develops.",
      isOpen: false
    },
    {
      question: "How often should I get screened for cervical cancer?",
      answer: "Women aged 21-29 should have a Pap test every 3 years. Women aged 30-65 can have a Pap test every 3 years, an HPV test every 5 years, or both tests together every 5 years. Women over 65 may stop screening if they've had adequate prior screening with normal results.",
      isOpen: false
    },
    {
      question: "Can cervical cancer be prevented?",
      answer: "Yes, cervical cancer is largely preventable through HPV vaccination, regular screening (Pap tests), practicing safe sex, limiting sexual partners, not smoking, and getting regular medical care. The HPV vaccine is most effective when given before becoming sexually active.",
      isOpen: false
    },
    {
      question: "What is the HPV vaccine and who should get it?",
      answer: "The HPV vaccine protects against the types of HPV that most commonly cause cervical cancer. It's recommended for boys and girls aged 11-12, though it can be given as early as age 9. People through age 26 who weren't adequately vaccinated earlier should also get the vaccine.",
      isOpen: false
    },
    {
      question: "What happens if my Pap test is abnormal?",
      answer: "An abnormal Pap test doesn't necessarily mean you have cancer. It indicates that some cells on your cervix look different from normal. Your doctor may recommend additional testing such as a colposcopy, HPV testing, or a repeat Pap test to determine the cause and appropriate treatment.",
      isOpen: false
    },
    {
      question: "What are the treatment options for cervical cancer?",
      answer: "Treatment depends on the stage and type of cervical cancer. Options include surgery (such as hysterectomy), radiation therapy, chemotherapy, or targeted therapy. Early-stage cervical cancer may be treated with surgery alone, while advanced stages often require a combination of treatments.",
      isOpen: false
    },
    {
      question: "What is the survival rate for cervical cancer?",
      answer: "The 5-year survival rate for cervical cancer varies by stage. When detected early (localized stage), the 5-year survival rate is about 92%. For regional spread, it's about 58%, and for distant spread, it's about 17%. Early detection through regular screening significantly improves outcomes.",
      isOpen: false
    },
    {
      question: "Can I still have children after cervical cancer treatment?",
      answer: "This depends on the type and extent of treatment. Some early-stage treatments like cone biopsy or trachelectomy may preserve fertility. However, treatments like hysterectomy or radiation therapy will affect fertility. Discuss fertility preservation options with your healthcare team before treatment begins.",
      isOpen: false
    }
  ];

  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

}
