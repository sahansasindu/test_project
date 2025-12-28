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
                bat 'docker build -t sahansasindu/nodeapp:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'samin-docker', variable: 'samindocker')]) {
                    script {
                        bat "docker login -u adomicarts -p %samindocker%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push adomicarts/nodeapp-cuban:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}

