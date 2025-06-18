
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

interface Statistic {
  number: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      description: "Board-certified gynecologic oncologist with 15+ years of experience in cervical cancer research and treatment.",
      image: "assets/images/team-1.jpg"
    },
    {
      name: "Dr. Michael Chen",
      role: "Research Coordinator",
      description: "Leading researcher in HPV prevention and cervical cancer screening technologies.",
      image: "assets/images/team-2.jpg"
    },
    {
      name: "Lisa Rodriguez",
      role: "Patient Advocate",
      description: "Cervical cancer survivor dedicated to supporting patients and raising awareness about prevention.",
      image: "assets/images/team-3.jpg"
    }
  ];

  statistics: Statistic[] = [
    {
      number: "50,000+",
      label: "Women Educated",
      description: "About cervical cancer prevention and screening"
    },
    {
      number: "92%",
      label: "Survival Rate",
      description: "When cervical cancer is detected early"
    },
    {
      number: "15+",
      label: "Years Experience",
      description: "In cervical cancer education and awareness"
    },
    {
      number: "100+",
      label: "Healthcare Partners",
      description: "Working together to prevent cervical cancer"
    }
  ];

  values = [
    {
      title: "Education First",
      description: "We believe that knowledge is the most powerful tool in preventing cervical cancer. Our mission is to provide accurate, accessible information to women everywhere.",
      icon: "📚"
    },
    {
      title: "Early Detection",
      description: "We advocate for regular screening and early detection, which can prevent cervical cancer or catch it at its most treatable stage.",
      icon: "🔬"
    },
    {
      title: "Compassionate Care",
      description: "We understand that facing cervical cancer can be overwhelming. We're here to provide support, resources, and hope throughout your journey.",
      icon: "💝"
    },
    {
      title: "Research & Innovation",
      description: "We support ongoing research into better prevention methods, treatments, and technologies to eliminate cervical cancer.",
      icon: "🧬"
    }
  ];
}