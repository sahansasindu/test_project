// pipeline {
//     agent any 
    
//     stages { 
//         stage('Checkout') {
//             steps {
//                 retry(3) {
//                     git branch: 'main', url: 'https://github.com/sahansasindu/test_project'
//                 }
//             }
//         }
//         stage('Build Docker Image') {
//             steps {  
//                 bat 'docker build -t sahansasindu/nodeapp:%BUILD_NUMBER% .'
//             }
//         }
//         stage('Login to Docker Hub') {
//             steps {
//                 withCredentials([string(credentialsId: 'test-doc-pw', variable: 'test-dockerpw')]) {
//                     script {
//                         bat "docker login -u sahansasindu -p %test-dockerpw%"
//                     }
//                 }
//             }
//         }
//         stage('Push Image') {
//             steps {
//                 bat 'docker push sahansasindu/nodeapp:%BUILD_NUMBER%'
//             }
//         }
//     }
//     post {
//         always {
//             bat 'docker logout'
//         }
//     }
// }
pipeline {
    agent any 

    environment {
        IMAGE_NAME = "sahansasindu/nodeapp1"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                retry(3) {
                    git branch: 'main', url: 'https://github.com/sahansasindu/test_project'
                }
            }
        }

        stage('Build Docker Image') {
            steps {  
                bat 'docker build --no-cache -t %IMAGE_NAME%:%BUILD_NUMBER% .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'test-doc-pw', variable: 'DOCKER_PW')]) {
                    bat '''
                    echo %DOCKER_PW% | docker login -u sahansasindu --password-stdin
                    '''
                }
            }
        }

        stage('Tag Image') {
            steps {
                bat 'docker tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest'
            }
        }

        stage('Push Image') {
            steps {
                retry(3) {
                    bat 'docker push %IMAGE_NAME%:%BUILD_NUMBER%'
                    bat 'docker push %IMAGE_NAME%:latest'
                }
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
