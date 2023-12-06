#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cctype>

void showTasks(const std::vector<std::string> &tasks)
{
    std::cout << "To-Do List:\n";
    for (size_t i = 0; i < tasks.size(); ++i)
    {
        std::cout << i + 1 << ". " << tasks[i] << '\n';
    }
}

void loadTasks(std::vector<std::string> &tasks, const std::string &filename)
{
    std::ifstream inputFile(filename);
    if (!inputFile)
    {
        std::cerr << "Failed to open " << filename << '\n';
        return;
    }

    std::string task;
    while (getline(inputFile, task))
    {
        tasks.push_back(task);
    }
}

void saveTasks(const std::vector<std::string> &tasks, const std::string &filename)
{
    std::ofstream outputFile(filename);
    if (!outputFile)
    {
        std::cerr << "Failed to open " << filename << '\n';
        return;
    }

    for (const auto &task : tasks)
    {
        outputFile << task << '\n';
    }
}

int main()
{
    std::vector<std::string> tasks;
    std::string task;
    char choice;

    loadTasks(tasks, "tasks.txt");

    do
    {
        std::cout << "A - Add a task\nV - View tasks\nQ - Quit\nEnter your choice: ";
        std::cin >> choice;
        std::cin.ignore(); // Clears the input buffer

        switch (std::tolower(choice))
        {
        case 'a':
            std::cout << "Enter a task: ";
            getline(std::cin, task);
            tasks.push_back(task);
            break;
        case 'v':
            showTasks(tasks);
            break;
        }
    } while (std::tolower(choice) != 'q');

    saveTasks(tasks, "tasks.txt");

    return 0;
}