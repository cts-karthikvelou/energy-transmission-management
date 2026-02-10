pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/karthikvelou-cts/energy-transmission-management.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Use the SonarQube server configured in Jenkins
                    withSonarQubeEnv('MySonarQubeServer') {

                        // Load the SonarScanner tool by NAME (from Global Tool Configuration)
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
