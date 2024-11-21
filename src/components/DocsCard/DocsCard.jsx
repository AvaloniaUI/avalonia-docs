import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link';
import styles from './DocsCard.css'

export const DocsCard = ({ label, link, height = 40, width = 40, title }) => {
    console.log(title);
    const kubernetesSvg = '/img/setup/icons/kubernetes.svg'

    const description = {
        "Try ToolJet": "Try out ToolJet with single docker command.",
        DigitalOcean: "Quickly deploy ToolJet using the Deploy to DigitalOcean button",
        Docker: "Deploy ToolJet on a server using docker-compose.",
        Heroku: "Deploy ToolJet on Heroku using the one-click-deployment button.",
        "AWS EC2": "Deploy ToolJet on AWS EC2 instances.",
        "AWS ECS": "Deploy ToolJet on AWS ECS instances.",
        Openshift: "Deploy ToolJet on Openshift",
        Kubernetes: "Deploy ToolJet on a Kubernetes cluster.",
        "Kubernetes (GKE)": "Deploy ToolJet on a GKE Kubernetes cluster.",
        "Kubernetes (AKS)": "Deploy ToolJet on a AKS Kubernetes cluster.",
        "Google Cloud Run": "Deploy ToolJet on Cloud Run with GCloud CLI.",
        "Deploying ToolJet client": "Deploy ToolJet Client on static website hosting services.",
        "Environment variables": "Environment variables required by ToolJet Client and Server to start running.",
        "Connecting via HTTP proxy": "Environment variables required by ToolJet to connect via HTTP proxy",
        "Deploying ToolJet on a subpath": "Steps to deploy ToolJet on a subpath rather than root of domain.",
        "V2 migration guide": "Things to know before migrating to ToolJet V2",
    }
    
    return (
        <Link to={link} className="homepage-card">
        <div className="card-content">
          <div className="py-5 px-3 font-jakarta text-2xl">
            {label}
          </div>
        </div>
      </Link>
    )
}

