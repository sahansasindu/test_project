pipeline {
    agent any 
    
    stages { 
        stage('Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/sahansasindu/test_project'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t sahansasindu/nodeapp2:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'test-doc-pw', variable: 'test-dockerpw')]) {
                    script {
                        bat "docker login -u sahansasindu -p %test-dockerpw%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push sahansasindu/nodeapp2:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}

