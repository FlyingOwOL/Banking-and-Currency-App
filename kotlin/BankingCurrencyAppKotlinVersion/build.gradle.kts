plugins {
    kotlin("jvm") version "2.1.20"
}


group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
}
tasks.jar {
    manifest {
        attributes["Main-Class"] = "MP_4_KotlinKt"
    }
    from(sourceSets.main.get().output)

    dependsOn(configurations.runtimeClasspath)
    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
    })}
tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(21)
}