pipeline {
    agent any

    tools {
        // This must match the name configured in:
        // Manage Jenkins → Global Tool Configuration → SonarQube Scanner
        sonarRunner 'SonarScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/karthikvelou-cts/energy-transmission-management.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                // sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('MySonarQubeServer') {
                        def scannerHome = tool 'SonarScanner'
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=cts-karthikvelou_energy-transmission-management_28a9341b-e6c2-4dd2-9af2-594dba9862a4 \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=https://dev.flowsource.next25era.org:447 \
                            -Dsonar.login=${SONARQUBE_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }
}
