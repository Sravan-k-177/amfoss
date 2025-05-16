#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>


void printContents(const char* filename){
    FILE *file = fopen(filename, "r");
    if (file == NULL){
        printf("Unable to open file");
        return;
    }    
    char ch;
    while((ch = fgetc(file)) != EOF){
        putchar(ch);
    }
    fclose(file);
}

int main() {
    char buffer[500];


    while (1) {

        if (getcwd(buffer, sizeof(buffer)) != NULL) {
            // printf("\033[1mbold_text\033[0m");
            printf("\033[1m");
            printf("\x1b[32m");
            printf("%s ~:> ", buffer+1);
            printf("\033[0m");}

        if (fgets(buffer, 500, stdin) == NULL) {
            break;
        }

        buffer[strcspn(buffer, "\n")] = '\0';

        if (strcmp(buffer, "exit") == 0){
            break;
        }

        if (strncmp(buffer, "cd", 2) == 0) {
            char *path = buffer + 3;
            if (chdir(path) != 0) {
                printf("\033[0;31m");
                printf("%s is not a directory \n", buffer+3);
                printf("\033[0m");
                continue;
            }
            continue;
        }
        
        if(strncmp(buffer,"cat",3)==0){
            printContents(buffer+4);
            continue;
        }

        if (strncmp(buffer, "pwd", 2) ==0 ){
               printf("Current working dir: \n");
        }

        pid_t pid = fork();

        if (pid == 0) {
            execvp(buffer, (char *[]) {buffer, NULL});
            printf("\033[0;31m");
            printf("command %s not available\n", buffer);
            printf("\033[0m");
            break;
        }
        else {
            int status;
            waitpid(pid, &status, 0);
        }
    }
    
    
return 0;}

