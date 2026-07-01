pipeline {
    agent any

    parameters {
        choice(name: 'BROWSER', choices: ['chrome', 'firefox'], description: 'Select browser test suite to run')
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    environment {
        CI = 'true'
        HEADLESS = 'true'
        TEST_SCRIPT = 'chrome'
        PLAYWRIGHT_INSTALL_TARGET = 'chromium'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    @echo on
                    setlocal EnableDelayedExpansion
                    echo PATH=%PATH%
                    where node
                    where npm
                    node -v
                    call npm -v
                    if errorlevel 1 exit /b 1
                    if exist package-lock.json (
                        echo package-lock.json found, running npm ci
                        call npm ci
                    ) else (
                        echo package-lock.json not found, running npm install
                        call npm install
                    )
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (params.BROWSER == 'chrome') {
                        env.PLAYWRIGHT_INSTALL_TARGET = 'chromium'
                    } else {
                        env.PLAYWRIGHT_INSTALL_TARGET = 'firefox'
                    }
                }
                bat '''
                    @echo on
                    call npx playwright install %PLAYWRIGHT_INSTALL_TARGET%
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (params.BROWSER == 'chrome') {
                        env.TEST_SCRIPT = 'chrome'
                    } else {
                        env.TEST_SCRIPT = 'firefox'
                    }
                }
                bat '''
                    @echo on
                    echo Selected browser: %BROWSER%
                    echo Running npm script: %TEST_SCRIPT%
                    call npm run %TEST_SCRIPT%
                    if errorlevel 1 exit /b 1
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}